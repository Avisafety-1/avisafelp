# AGENTS.md

- App runs on TanStack Start with file-based routes in `src/routes/`; why: server-rendered HTML so crawlers and AI assistants can read every page.
- Server-rendered head tags (title, meta, JSON-LD) belong in each route's `head()`; `@/lib/page-head` `<Helmet>` is client-only and only for legacy per-page tweaks; why: crawlers only see server-rendered head.
- Browser-only libraries (react-pdf/pdfjs, etc.) are loaded via `ClientOnly` + `lazy` wrappers; why: their module init crashes server rendering.
- Render language is derived from URL prefixes with isolated i18n instances; first HTML visits redirect using edge country metadata unless a manual language cookie or explicit prefix wins; why: region-based defaults must not override deliberate choices or create shared-state SSR mismatches.
- Shared JSX localization translates display strings at host-element boundaries using checked-in dictionaries, never business data or identifiers; why: legacy and data-driven pages need consistent translations without changing their behavior.
- JSX localization wrappers must forward injected props and refs to the rendered element; why: slot-based menu controls need their event handlers and ARIA attributes to reach the actual control.
- Localized route files mirror existing pages and share head localization; maintain the locale route inventory when adding or removing pages so hreflang never advertises absent counterparts.
- Old react-router call sites go through `@/lib/router-compat`; why: keeps react-router calling conventions working on TanStack Router.
- Server-side logic that the app calls lives in `src/lib/*.functions.ts` (createServerFn); the AI search remains a backend function; why: one runtime for app logic, streaming AI left as-is.
- `/sitemap.xml` is a server route built from each route's required `staticData.sitemap` plus published articles; why: stays in sync with routes and content automatically.
- Hidden pages use per-route `noindex` meta, not robots.txt Disallow; why: crawlers must be able to fetch a page to see its noindex.
- English landing pages use `src/pages/en/LandingTemplate.tsx` with content in `src/content/en/*`; About/Partners content in `src/content/company.ts`; why: copy can be reviewed and edited without touching layout.
