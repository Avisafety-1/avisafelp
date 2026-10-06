# AGENTS.md

- App runs on TanStack Start with file-based routes in `src/routes/`; why: server-rendered HTML so crawlers and AI assistants can read every page.
- Server-rendered head tags (title, meta, JSON-LD) belong in each route's `head()`; `@/lib/page-head` `<Helmet>` is client-only and only for legacy per-page tweaks; why: crawlers only see server-rendered head.
- Browser-only libraries (react-pdf/pdfjs, etc.) are loaded via `ClientOnly` + `lazy` wrappers; why: their module init crashes server rendering.
- Language is derived only from the URL (`/en` = English, else Norwegian) via `languageForPath`; no IP or stored-choice switching; the browser-language banner only stores whether it shows; why: content must always match the address for crawlers and users.
- Old react-router call sites go through `@/lib/router-compat`; why: keeps react-router calling conventions working on TanStack Router.
- Server-side logic that the app calls lives in `src/lib/*.functions.ts` (createServerFn); the AI search remains a backend function; why: one runtime for app logic, streaming AI left as-is.
- `/sitemap.xml` is a server route built from each route's required `staticData.sitemap` plus published articles; why: stays in sync with routes and content automatically.
- Hidden pages use per-route `noindex` meta, not robots.txt Disallow; why: crawlers must be able to fetch a page to see its noindex.
