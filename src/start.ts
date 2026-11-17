import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { initialLocale, localeForPath, pathForLocale } from "./lib/locales";

const regionLanguageMiddleware = createMiddleware().server(async ({ request, next }) => {
  const url = new URL(request.url);
  if (request.method !== "GET" || !request.headers.get("accept")?.includes("text/html") || /\.[a-z0-9]+$/i.test(url.pathname) || url.pathname.startsWith("/api/") || url.pathname.startsWith("/__") || /bot|crawler|spider|google|bing/i.test(request.headers.get("user-agent") ?? "")) return next();
  const preference = request.headers.get("cookie")?.match(/(?:^|;\s*)avisafe-language=([^;]+)/)?.[1];
  const cf = (request as Request & { cf?: { country?: string } }).cf;
  const country = cf?.country ?? request.headers.get("cf-ipcountry");
  const locale = initialLocale(url.pathname, country, preference);
  if (localeForPath(url.pathname) === "no" && locale !== "no") {
    return new Response(null, { status: 302, headers: { location: pathForLocale(url.pathname, locale) + url.search, "cache-control": "private, no-store", vary: "Cookie, CF-IPCountry" } });
  }
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware, regionLanguageMiddleware],
}));
