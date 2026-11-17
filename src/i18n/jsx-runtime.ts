import { createElement, useContext, type ElementType, type ReactNode } from "react";
import { jsx as reactJsx, jsxs as reactJsxs, Fragment } from "react/jsx-runtime";
import { I18nContext } from "react-i18next";
import { translateDisplay } from "./display-translation";
export { Fragment };
function LocalizedElement({ elementType, elementProps }: { elementType: ElementType; elementProps: Record<string, unknown> }) {
  const context = useContext(I18nContext);
  const language = context?.i18n?.language ?? "no";
  const props = { ...elementProps };
  if (!elementProps['data-no-translate'] && !['script', 'style', 'code', 'pre', 'textarea'].includes(String(elementType))) {
    const translateChild = (child: unknown): unknown => typeof child === "string" ? translateDisplay(child, language) : Array.isArray(child) ? child.map(translateChild) : child;
    props['children'] = translateChild(props['children']);
    for (const key of ['title', 'alt', 'placeholder', 'aria-label']) {
      const value = props[key];
      if (typeof value === 'string') props[key] = translateDisplay(value, language);
    }
    const html = props['dangerouslySetInnerHTML'] as { __html?: string } | undefined;
    if (html?.__html) props['dangerouslySetInnerHTML'] = { __html: html.__html.replace(/>([^<]+)</g, (_, text: string) => `>${translateDisplay(text, language)}<`) };
  }
  return createElement(elementType, props);
}
export const jsx: typeof reactJsx = (type, props, key) => (typeof type === 'string' || (typeof type === 'object' && type !== null && 'render' in type)) && !['html', 'head', 'body', 'meta', 'link', 'title', 'script', 'style', 'svg', 'path'].includes(String(type))
  ? reactJsx(LocalizedElement, { elementType: type, elementProps: props }, key)
  : reactJsx(type, props, key);
export const jsxs: typeof reactJsxs = (type, props, key) => (typeof type === 'string' || (typeof type === 'object' && type !== null && 'render' in type)) && !['html', 'head', 'body', 'meta', 'link', 'title', 'script', 'style', 'svg', 'path'].includes(String(type))
  ? reactJsxs(LocalizedElement, { elementType: type, elementProps: props }, key)
  : reactJsxs(type, props, key);
export type { JSX } from "react/jsx-runtime";
