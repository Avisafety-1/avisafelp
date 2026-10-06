# AGENTS.md

- App runs on TanStack Start with file-based routes in `src/routes/`; why: server-rendered HTML so crawlers and AI assistants can read every page.
- Server-rendered head tags (title, meta, JSON-LD) belong in each route's `head()`; `@/lib/page-head` `<Helmet>` is client-only and only for legacy per-page tweaks; why: crawlers only see server-rendered head.
- Browser-only libraries (react-pdf/pdfjs, etc.) are loaded via `ClientOnly` + `lazy` wrappers; why: their module init crashes server rendering.
- Language is derived only from the URL (`/en` = English, else Norwegian); each language has its own i18n instance chosen per request via `i18nForPath`; language pairs and hreflang come only from `src/lib/alternates.ts`; why: content and hreflang must always match the address without shared mutable state.
- Old react-router call sites go through `@/lib/router-compat`; why: keeps react-router calling conventions working on TanStack Router.
- Server-side logic that the app calls lives in `src/lib/*.functions.ts` (createServerFn); the AI search remains a backend function; why: one runtime for app logic, streaming AI left as-is.
- `/sitemap.xml` is a server route built from each route's required `staticData.sitemap` plus published articles; why: stays in sync with routes and content automatically.
- Hidden pages use per-route `noindex` meta, not robots.txt Disallow; why: crawlers must be able to fetch a page to see its noindex.
- English landing pages use `src/pages/en/LandingTemplate.tsx` with content in `src/content/en/*`; About/Partners content in `src/content/company.ts`; why: copy can be reviewed and edited without touching layout.
