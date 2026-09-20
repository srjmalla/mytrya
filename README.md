# mytrya.com

Marketing site for Mytrya, a one-person AI engineering practice. Next.js 16, static export, served from Cloudflare Pages. The contact form is a Pages Function that relays through Resend.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build and deploy

```bash
npm run build        # writes ./out
npx wrangler pages deploy out --project-name mytrya-ai-website --branch redesign-preview   # preview
npx wrangler pages deploy out --project-name mytrya-ai-website                             # production
```

Secrets for the contact form, set once:

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name mytrya-ai-website
```

## Where things live

- `app/lib/site.ts` — name, email, links. Change identity here only.
- `app/lib/services.ts`, `work.ts`, `faq.ts`, `process.ts` — all copy.
- `functions/api/contact.ts` — the contact endpoint (Cloudflare Pages Function).
- `public/_headers` — security and cache headers for Pages.
