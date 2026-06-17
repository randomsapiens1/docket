# Project Instructions: docket

## Architecture & Internationalization
- **i18n Support**: The project uses a custom `LanguageProvider` (`lib/language-context.tsx`). Use the `useLanguage` hook to access the current `language` ('en' or 'bn') and `setLanguage`.
- **Service Hub Pattern**: Detailed service guides are built as interactive pages in `app/services/[service-slug]/page.tsx`. These pages should include a `StepTimeline`, `RequiredDocuments` checklist, and `Post-Registration Compliance` sections.

## UI & Design Conventions
- **Aesthetic**: Flat UI with high contrast.
- **Borders over Shadows**: Avoid CSS shadows (`shadow-*`, `drop-shadow-*`). Instead, use bold borders (e.g., `border-2 border-black` or `border-[3px]`).
- **Typography**: Uses Geist and Geist Mono from `next/font/google` with `display: 'swap'`.
- **Colors**: Primary brand color is `#ff0000` (Docket Red).

## Performance Optimization
- **Lazy Loading**: Landing page sections below the fold should be lazy-loaded using `next/dynamic` to minimize the initial JS bundle.
- **Images**: Use `.webp` for large illustrations. Filenames must be lowercase and hyphenated (e.g., `docket-hero.webp`).
- **Icons**: Use `lucide-react`. Ensure `next.config.mjs` has `experimental.optimizePackageImports` enabled for tree-shaking.

## Vercel & Deployment
- **Supabase Initialization**: Always handle missing environment variables in `createClient` and `createServerClient` to prevent build-time failures. Use fallbacks for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` during the build process, as Vercel's build workers may not have these variables available even if they are configured in the dashboard.
- **Environment Variables**: Use `.trim()` when reading Supabase credentials to prevent accidental whitespace issues.

## Metadata & Branding
- **Title Format**: Browser tab titles should follow `Docket | [Tagline]`.
- **Favicons**: Use the original `Docket-logo.png` for all site icons and metadata.
