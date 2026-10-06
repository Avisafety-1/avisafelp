import { Children, isValidElement, useEffect, type ReactElement, type ReactNode } from "react";

/**
 * Client-side page head manager with the same call shape as react-helmet-async's
 * <Helmet>. Children (<title>, <meta>, <link>, <script>, <html lang>) are applied
 * to document.head after mount and reverted on unmount. Server-rendered head
 * tags come from the route tree's head() instead.
 */

type HeadEl = ReactElement<Record<string, unknown>>;

function textOf(children: unknown): string {
  if (children == null || typeof children === "boolean") return "";
  if (Array.isArray(children)) return children.map(textOf).join("");
  return String(children);
}

function attrName(key: string): string {
  if (key === "className") return "class";
  if (key === "httpEquiv") return "http-equiv";
  if (key === "charSet") return "charset";
  return key;
}

function collect(children: ReactNode): HeadEl[] {
  const out: HeadEl[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && typeof child.type === "string") out.push(child as HeadEl);
  });
  return out;
}

export function Helmet({ children }: { children?: ReactNode }) {
  const elements = collect(children);
  const signature = JSON.stringify(
    elements.map((el) => [el.type, { ...el.props, children: textOf(el.props["children"]) }]),
  );

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const head = document.head;

    for (const el of elements) {
      const { children: kids, ...props } = el.props;
      const type = el.type as string;

      if (type === "title") {
        const prev = document.title;
        document.title = textOf(kids);
        cleanups.push(() => {
          document.title = prev;
        });
        continue;
      }

      if (type === "html") {
        const lang = props["lang"];
        if (typeof lang === "string") {
          const prev = document.documentElement.lang;
          document.documentElement.lang = lang;
          cleanups.push(() => {
            document.documentElement.lang = prev;
          });
        }
        continue;
      }

      // Replace an existing meta with the same name/property, or canonical link.
      let selector: string | null = null;
      if (type === "meta" && typeof props["name"] === "string") selector = `meta[name="${props["name"]}"]`;
      if (type === "meta" && typeof props["property"] === "string")
        selector = `meta[property="${props["property"]}"]`;
      if (type === "link" && props["rel"] === "canonical") selector = 'link[rel="canonical"]';

      // Never remove or replace tags React rendered from route head() — React owns
      // those nodes and crashes if they disappear. Route head() always wins.
      if (selector && head.querySelector(selector)) continue;

      const node = document.createElement(type);
      for (const [key, value] of Object.entries(props)) {
        if (value == null || value === false) continue;
        node.setAttribute(attrName(key), String(value));
      }
      const text = textOf(kids);
      if (text) node.textContent = text;
      node.setAttribute("data-page-head", "");
      head.appendChild(node);

      cleanups.push(() => {
        node.remove();
      });
    }

    return () => {
      for (let i = cleanups.length - 1; i >= 0; i--) cleanups[i]?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  return null;
}
