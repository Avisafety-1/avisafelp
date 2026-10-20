import { useState } from "react";
import { useNavigate } from "@/lib/router-compat";
import {
  ShoppingCart,
  Zap,
  Shield,
  Satellite,
  Battery,
  Feather,
  Plane,
  Activity,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Link } from "@/lib/router-compat";
import type { ShopProduct } from "@/data/shopProducts";
import { useShopCart, formatNok } from "@/stores/shopCart";
import { useShopStock } from "@/hooks/use-shop-stock";

const StockLabel = ({ qty }: { qty: number | undefined }) => {
  if (qty === undefined) return <div className="mt-3 h-5" />;
  if (qty <= 0)
    return (
      <div className="mt-3 flex items-center gap-2 text-sm font-medium text-destructive">
        <span className="inline-block w-2 h-2 rounded-full bg-destructive" />
        Utsolgt
      </div>
    );
  return (
    <div className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-700">
      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
      {qty} stk på lager
    </div>
  );
};

const features = [
  { icon: Shield, title: "Dual Remote ID", desc: "Sender både Network RID og Direct (Broadcast) RID — i samsvar med EU, FAA, CAA og CAAS." },
  { icon: Battery, title: "Opptil 14 timers batteritid", desc: "Hel-dags flyvning, eller koble den direkte til drone-strømmen." },
  { icon: Feather, title: "Kun 32 gram", desc: "Lett nok for selv de minste dronene — påvirker ikke ytelse eller balanse." },
  { icon: Satellite, title: "Multi-GNSS", desc: "GPS, GLONASS, Galileo og SBAS for stabil og nøyaktig posisjonering." },
  { icon: Zap, title: "Integrerte antenner", desc: "LTE, Bluetooth og GNSS innebygd — ingen eksterne deler som kan brekke." },
  { icon: Activity, title: "Flight-phase detection", desc: "Detekterer take-off, landing og fri fall automatisk for økt situasjonsforståelse." },
];

const steps = [
  { n: "01", title: "Fest Mini", desc: "Monter Mini på dronen din med medfølgende fester." },
  { n: "02", title: "Slå på", desc: "Trykk på knappen — Mini kobler seg til mobilnettet automatisk." },
  { n: "03", title: "Ta av", desc: "Dronen er klar for flygning på under 2 minutter." },
  { n: "04", title: "Fly & overvåk", desc: "Følg flyvningen live i Dronetag-appen på iOS, Android eller web." },
];

const ButikkProdukt = ({ product }: { product: ShopProduct }) => {
  const navigate = useNavigate();
  const isMini = product.id === "dronetag-mini";
  const [activeImg, setActiveImg] = useState(product.gallery[0]);
  const addItem = useShopCart((s) => s.addItem);
  const setCartOpen = useShopCart((s) => s.setOpen);
  const stock = useShopStock();
  const miniQty = stock?.[product.id];
  const miniSoldOut = miniQty !== undefined && miniQty <= 0;

  const handleAddToCart = () => {
    addItem(product, 1);
    setCartOpen(true);
    toast.success("Lagt til i handlevognen");
  };

  const handleBuyNow = () => {
    addItem(product, 1);
    navigate("/butikk/checkout");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.gallery,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      url: `https://avisafe.no/butikk/${product.slug}`,
      priceCurrency: "NOK",
      price: product.priceNok,
      availability: miniSoldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "AviSafe" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-[hsl(210,30%,96%)] pt-24 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <Link to="/butikk" className="inline-flex items-center gap-2 text-sm text-[hsl(210,45%,30%)] hover:text-[#123b87] mb-6">
            <ArrowLeft className="w-4 h-4" />
            Alle produkter
          </Link>
          {/* Hero */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-black/5 shadow-xs">
                <img
                  src={activeImg}
                  alt={product.title}
                  className={`w-full h-full ${product.imageFit === "contain" ? "object-contain p-8" : "object-cover"}`}
                />
              </div>
              {product.gallery.length > 1 && <div className="grid grid-cols-6 gap-2">
                {product.gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(src)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImg === src ? "border-[#123b87]" : "border-transparent hover:border-black/20"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>}
            </div>

            {/* Info */}
            <div className="lg:sticky lg:top-28">
              <p className="text-xs uppercase tracking-widest text-[#123b87] font-semibold">
                {product.kicker}
              </p>
              <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(210,45%,12%)] leading-tight">
                {product.title}
              </h1>
              <p className="mt-2 text-lg text-[hsl(210,45%,25%)]">
                {product.tagline}
              </p>
              <p className="mt-5 text-base md:text-lg text-[hsl(210,45%,30%)] leading-relaxed">
                {product.shortDescription} {product.longDescription}
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-[hsl(210,45%,12%)]">
                  {formatNok(product.priceNok)}
                </span>
                <span className="text-sm text-muted-foreground">inkl. 25 % mva</span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  disabled={miniSoldOut}
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#123b87] hover:bg-[#0e2f6b] text-white h-14 text-base"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Legg i handlevogn
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  disabled={miniSoldOut}
                  onClick={handleBuyNow}
                  className="flex-1 h-14 text-base border-[#123b87] text-[#123b87] hover:bg-[#123b87]/5"
                >
                  Kjøp nå
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <StockLabel qty={miniQty} />

              <ul className="mt-6 space-y-2 text-sm text-[hsl(210,45%,25%)]">
                {product.highlights.map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#123b87]" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {isMini && (<>
          {/* Features */}
          <section className="mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(210,45%,12%)]">
              Egenskaper
            </h2>
            <p className="mt-2 text-[hsl(210,45%,30%)] max-w-2xl">
              Bygd for profesjonelle dronepiloter, beredskapsetater og operatører
              som trenger pålitelig Remote ID i krevende miljøer.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl bg-white border border-black/5 shadow-xs"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#123b87]/10 text-[#123b87] flex items-center justify-center">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[hsl(210,45%,12%)]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-[hsl(210,45%,30%)] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(210,45%,12%)]">
              I lufta på under 2 minutter
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s) => (
                <div key={s.n} className="p-6 rounded-2xl bg-white border border-black/5">
                  <span className="text-sm font-mono text-[#123b87]">{s.n}</span>
                  <h3 className="mt-2 text-lg font-semibold text-[hsl(210,45%,12%)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[hsl(210,45%,30%)]">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Specs */}
          <section className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(210,45%,12%)]">
                Spesifikasjoner
              </h2>
              <p className="mt-2 text-[hsl(210,45%,30%)]">
                Alt du trenger å vite om Dronetag Mini.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-black/5 overflow-hidden">
              <dl className="divide-y divide-black/5 text-sm">
                {[
                  ["Vekt", "32 g"],
                  ["Batteritid", "Opptil 14 timer"],
                  ["Tilkobling", "LTE-M / NB-IoT (chip-SIM) + Bluetooth 5"],
                  ["GNSS", "GPS, GLONASS, Galileo, SBAS"],
                  ["Sensorer", "Barometer, akselerometer"],
                  ["RID-protokoller", "EU (EASA), FAA (USA), CAA (UK), CAAS (SGP)"],
                  ["Sikkerhet", "DTLS-kryptering, OTA-oppdateringer, soldered chip-SIM"],
                  ["App-støtte", "iOS, Android, Web"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-2 gap-4 px-5 py-3">
                    <dt className="text-[hsl(210,45%,30%)]">{k}</dt>
                    <dd className="font-medium text-[hsl(210,45%,12%)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Subscription note */}
          <section className="mt-24 rounded-3xl bg-[hsl(210,45%,12%)] text-white p-8 md:p-12">
            <div className="flex items-start gap-4">
              <Plane className="w-8 h-8 text-white/70 shrink-0" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Nettverkstilkobling
                </h2>
                <p className="mt-3 text-white/80 max-w-3xl leading-relaxed">
                  For å bruke Network Remote ID og live-telemetri trenger du
                  Dronetags abonnement. Planer starter på ca. €15/mnd, og du får
                  de to første månedene gratis. Direct/Broadcast Remote ID
                  fungerer uten abonnement.
                </p>
                <a
                  href="https://www.dronetag.com/subscription"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/80"
                >
                  Se planer og priser
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(210,45%,12%)]">
              Ofte stilte spørsmål
            </h2>
            <div className="mt-8 rounded-2xl bg-white border border-black/5">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    q: "Hva er Remote ID?",
                    a: "Remote ID er en digital identifikasjon som lar droner sende ut posisjon, identitet og status — sammenlignbart med et 'nummerskilt' for lufta. Det er påkrevd i EU, USA, Storbritannia og flere andre land for å fly i flere kategorier.",
                  },
                  {
                    q: "Trenger jeg Remote ID i Norge?",
                    a: "Ja. EUs droneregelverk (som Norge følger gjennom EASA) krever Remote ID for droner i Klasse C1–C6 og for operasjoner i 'specific'-kategorien. Dronetag Mini gjør eldre droner compliant.",
                  },
                  {
                    q: "Fungerer Mini med dronen min?",
                    a: "Ja. Mini er universal og festes på de aller fleste droner — fra DJI til selvbygde rammer. Den kan strømforsynes fra eget batteri eller direkte fra dronen.",
                  },
                  {
                    q: "Hvor raskt leveres ordren?",
                    a: "Vi sender innen 1–3 virkedager fra ordren er bekreftet. Frakt i Norge er inkludert.",
                  },
                  {
                    q: "Hva slags garanti gjelder?",
                    a: "2 års produsentgaranti gjennom Dronetag, i tillegg til norske forbrukerrettigheter.",
                  },
                  {
                    q: "Kan jeg returnere produktet?",
                    a: "Ja, du har 14 dagers angrerett etter forbrukerkjøpsloven så lenge produktet er ubrukt og i original emballasje.",
                  },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-black/5 px-5">
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[hsl(210,45%,30%)] leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-24 rounded-3xl bg-gradient-to-br from-[#123b87] to-[#0e2f6b] text-white p-8 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Klar for å gjøre dronen din Remote ID-compliant?
            </h2>
            <p className="mt-3 text-white/80 max-w-2xl mx-auto">
              Dronetag Mini sendes klar til bruk — bare fest, slå på og fly.
            </p>
            <Button
              size="lg"
              disabled={miniSoldOut}
                  onClick={handleAddToCart}
              className="mt-8 bg-white text-[#123b87] hover:bg-white/90 h-14 px-8 text-base font-semibold"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Legg i handlevogn — {formatNok(product.priceNok)}
            </Button>
          </section>
          </>)}
        </div>
      </main>
    </>
  );
};

export default ButikkProdukt;
