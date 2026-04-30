# Lili Vet public website

This is the public-facing React/Vite website for Lili Vet Hospital. It contains:

- the marketing/public pages
- the appointment booking flow
- the new-patient registration flow

## Local development

1. Install dependencies:
   - `npm install`
2. Create `.env` from `.env.example`
3. Start the dev server:
   - `npm run dev`

## Required environment variable

```env
VITE_API_BASE_URL=https://lilivet.onrender.com/api
```

The frontend also tolerates `https://lilivet.onrender.com` and will append `/api`, but the explicit `/api` base URL is the intended production setting.

## Vercel deployment

If this folder is pushed as its own repository, create a separate Vercel project for it with:

- Root Directory: repository root
- Build Command: `npm run build`
- Output Directory: `dist`

Set:

```env
VITE_API_BASE_URL=https://lilivet.onrender.com/api
```

If you later place this app inside a larger monorepo, set the Vercel Root Directory to that subfolder.

`vercel.json` already includes the redirects and SPA rewrites needed for React Router routes on Vercel.
