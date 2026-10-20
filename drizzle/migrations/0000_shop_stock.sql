CREATE TABLE public.shop_stock (
  product_id text PRIMARY KEY,
  quantity integer NOT NULL CHECK (quantity >= 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.shop_stock TO anon, authenticated;
GRANT ALL ON public.shop_stock TO service_role;
ALTER TABLE public.shop_stock ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Stock is public" ON public.shop_stock FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins update stock" ON public.shop_stock FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
GRANT UPDATE ON public.shop_stock TO authenticated;

INSERT INTO public.shop_stock (product_id, quantity) VALUES ('dronetag-mini', 9), ('avisafe-patch', 45);

CREATE TABLE public.shop_orders (
  session_id text PRIMARY KEY,
  items jsonb NOT NULL,
  amount_total integer,
  customer_email text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.shop_orders TO authenticated;
GRANT ALL ON public.shop_orders TO service_role;
ALTER TABLE public.shop_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read orders" ON public.shop_orders FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Records a paid order once and decrements stock atomically.
CREATE OR REPLACE FUNCTION public.apply_shop_order(_session_id text, _items jsonb, _amount integer, _email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE it jsonb;
BEGIN
  INSERT INTO public.shop_orders (session_id, items, amount_total, customer_email)
  VALUES (_session_id, _items, _amount, _email)
  ON CONFLICT (session_id) DO NOTHING;
  IF NOT FOUND THEN RETURN false; END IF;
  FOR it IN SELECT * FROM jsonb_array_elements(_items) LOOP
    UPDATE public.shop_stock
      SET quantity = GREATEST(quantity - (it->>'quantity')::int, 0), updated_at = now()
      WHERE product_id = it->>'id';
  END LOOP;
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.apply_shop_order(text, jsonb, integer, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.apply_shop_order(text, jsonb, integer, text) TO service_role;