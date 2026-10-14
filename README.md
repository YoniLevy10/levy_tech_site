# OpsBrain marketing site

Next.js landing page for OpsBrain (custom business systems, AI, automations).

## Local preview

```bash
pnpm install
pnpm run dev
```

Open http://localhost:3000

## Promo video

Hosted statically at `public/videos/opsbrain-promo.mp4` (~2.3 MB, portrait).

- Landing section: click-to-play, `preload="none"`, poster frame, reserved `aspect-[4/5]`
- Source was provided via Google Drive; for larger future assets prefer **Vercel Blob**, **Cloudflare R2**, or **YouTube unlisted** instead of committing big files to git
- Drive iframe is not used (direct MP4 is more reliable for click-to-play + mobile)

## Env vars

See `.env.example` — notably `RESEND_API_KEY` + `CONTACT_TO` for the contact form.
