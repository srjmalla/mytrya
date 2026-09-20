# mytrya.com

Marketing site for Mytrya, a one-person AI engineering practice. Next.js 16, static export, served from Cloudflare Pages. The contact form is a Pages Function that relays through Resend.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build and deploy

The Cloudflare Pages project `mytrya` is connected to this repository. A push to
`main` builds (`npm run build`) and deploys production; any other pushed branch
gets a preview URL. Nothing to run by hand.

```bash
npm run build        # writes ./out, same as the Pages build
```

Manual deploy, if ever needed:

```bash
npx wrangler pages deploy out --project-name mytrya --branch main
```

Secrets for the contact form live in the Pages dashboard: Settings, Variables and
Secrets, Production. `RESEND_API_KEY` is required; `CONTACT_TO` and `CONTACT_FROM`
are optional.

## Where things live

- `app/lib/site.ts` — name, email, links. Change identity here only.
- `app/lib/services.ts`, `work.ts`, `faq.ts`, `process.ts` — all copy.
- `functions/api/contact.ts` — the contact endpoint (Cloudflare Pages Function).
- `public/_headers` — security and cache headers for Pages.
