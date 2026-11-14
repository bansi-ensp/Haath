# Haath

A hyperlocal trust network for informal workers in Hyderabad and the households that hire them.

## Stack

- Next.js 16 (App Router) + TypeScript
- Hosted on Vercel, deployed from this repo
- GitHub Actions runs a build check on every push and pull request

## Local development

Requires Node 22 (see `.nvmrc`).

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Deployment

- Push to `main` → Vercel deploys to production.
- Open a pull request → Vercel creates a preview URL and comments it on the PR.
- CI (`.github/workflows/ci.yml`) must pass before merging.

## Secrets and data

This repo is public. Never commit API keys, `.env` files, or any real worker or household data.
Put secrets in Vercel → Project → Settings → Environment Variables, and list the variable names (not values) in `.env.example`.
