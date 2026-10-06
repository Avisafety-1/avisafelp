# AGENTS.md

- App runs on TanStack Start with file-based routes in `src/routes/`; why: server-rendered HTML so crawlers and AI assistants can read every page.
- Server-rendered head tags (title, meta, JSON-LD) belong in each route's `head()`; `@/lib/page-head` `<Helmet>` is client-only and only for legacy per-page tweaks; why: crawlers only see server-rendered head.
- Browser-only libraries (react-pdf/pdfjs, etc.) are loaded via `ClientOnly` + `lazy` wrappers; why: their module init crashes server rendering.
- i18n renders a fixed language on server and first client paint; visitor language is applied after hydration settles; why: avoids hydration mismatches.
- Old react-router call sites go through `@/lib/router-compat`; why: keeps react-router calling conventions working on TanStack Router.
- Server-side logic that the app calls lives in `src/lib/*.functions.ts` (createServerFn); the AI search remains a backend function; why: one runtime for app logic, streaming AI left as-is.
- `/sitemap.xml` is a server route built from each route's required `staticData.sitemap` plus published articles; why: stays in sync with routes and content automatically.
- Hidden pages use per-route `noindex` meta, not robots.txt Disallow; why: crawlers must be able to fetch a page to see its noindex.
