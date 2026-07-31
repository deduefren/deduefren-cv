# Cv App

React 19 + TypeScript + Vite application with server-side rendering (SSR) for SEO.

## Prerequisites

- Node.js 18.13.0 or newer
- npm (comes with Node.js)

## Install Dependencies

```bash
npm install
```

## Run The Project

### 1) SSR Development Mode (recommended)

Starts the Express SSR server with Vite middleware.

```bash
npm run dev
```

Open:

- http://localhost:5173

### 2) SPA Development Mode (no SSR)

Runs plain Vite dev server.

```bash
npm run dev:spa
```

## API Proxy Behavior

In development, requests to `/api/*` are proxied to:

- http://localhost:7071

This keeps the contact form endpoint compatible with the existing backend contract.

## Type Check

```bash
npm run typecheck
```

## Run Tests

Run once:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Production Build

```bash
npm run build
```

Output:

- `dist/client` (client bundle)
- `dist/server` (SSR server bundle)

## Run Production SSR

```bash
npm run start
```

The production server uses `server.mjs` and serves the built assets from `dist/client`.

## Main Scripts

- `npm run dev` - SSR development server
- `npm run dev:spa` - Vite SPA development server
- `npm run typecheck` - TypeScript type checking
- `npm test` - Unit tests with Vitest
- `npm run build` - Client + SSR build
- `npm run start` - Serve production SSR build

## Project Entrypoints

- `src/entry-client.tsx` - client hydration entrypoint
- `src/entry-server.tsx` - server render entrypoint
- `server.mjs` - Express SSR server

## Troubleshooting

- Port already in use: set `PORT` before running (PowerShell example):

```powershell
$env:PORT=5174
npm run dev
```

- Backend API not reachable: ensure the API host is running at `http://localhost:7071`.
