# mytrya.com

Marketing site for Mytrya Intelligence, a one-person AI engineering practice. Next.js 16, static export, served from Cloudflare Pages. The contact form is a Pages Function that relays through Resend.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build and deploy

Deploys run from `.github/workflows/deploy.yml` on every push to `main`. The workflow
needs two repository secrets, listed at the top of the file.

The Cloudflare Pages project is `mytrya-ai-website`. Its production branch is
`hero-image-fix` (a legacy name); deploying any other branch makes a preview. Manual deploy:

```bash
npm run build
npx wrangler pages deploy out --project-name=mytrya-ai-website --branch=hero-image-fix
```

Secrets for the contact form live in the Pages dashboard: Settings, Variables and
Secrets, Production. `RESEND_API_KEY` is required; `CONTACT_TO` and `CONTACT_FROM`
are optional.

## Where things live

- `app/lib/site.ts` — name, email, links. Change identity here only.
- `app/lib/services.ts`, `work.ts`, `notes.ts`, `faq.ts`, `process.ts` — all copy.
- `app/lib/site.ts` also holds availability and published prices.
- `app/llms.txt`, `app/llms-full.txt`, `app/feed.xml` — generated from the same data.
- `functions/api/contact.ts` — the contact endpoint (Cloudflare Pages Function).
- `public/_headers` — security and cache headers for Pages.
