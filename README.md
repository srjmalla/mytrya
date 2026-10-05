# mytrya.com

Marketing site for Mytrya, a one-person AI engineering practice. Next.js 16, static export, served from Cloudflare Pages. The contact form is a Pages Function that relays through Resend.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build and deploy

`npm run build` first runs `scripts/fetch-activity.mjs`, which reads the commit history of
my own product repos and checks each product is up, and writes `app/data/activity.json`.
That file feeds the build log, the "last shipped" line and the product status. Without a
GitHub token the committed snapshot is used, so the build never fails for lack of one.

Deploys run from `.github/workflows/deploy.yml`: on every push to `main`, and every
morning at 06:15 Kathmandu so the site stays current on its own. The workflow needs three
repository secrets, listed at the top of the file.

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
