# Dead Signal

Animated multi-stage ARG-style monitoring interface built with Next.js App Router, TypeScript, and Tailwind CSS. The puzzle layer is distributed across console output, HTML comments, secret routes, terminal commands, and gated API responses.

## Run locally

```bash
npm install
npm run dev
```

## Structure

- `src/app/page.tsx`: anonymous access screen and hidden interaction entry point
- `src/app/logs/page.tsx`: historical system log route
- `src/app/terminal/page.tsx`: legacy shell route with command parsing
- `src/app/archive/page.tsx`: first unlocked layer, narrative archive, and second gate
- `src/app/observer/page.tsx`: third-layer witness route unlocked from the archive
- `src/app/sealed/page.tsx`: final gated chamber
- `src/app/api/gate/route.ts`: first gate verification and archive session cookie
- `src/app/api/gate/archive/route.ts`: second gate verification and observer session cookie
- `src/app/api/gate/observer/route.ts`: third gate verification and final chamber session cookie
- `src/app/api/handshake/route.ts`: hidden second-stage clue endpoint
- `src/app/api/observer-report/route.ts`: hidden third-stage clue endpoint
- `src/app/api/system-status/route.ts`: discoverable system status endpoint
- `src/app/api/transmission/route.ts`: encoded clue endpoint for later puzzle expansion
- `src/components/protocol-gate.tsx`: reusable gated input panel for deeper puzzle layers
- `src/lib/arg-content.ts`: centralized narrative fragments, clue text, and route payloads

## Deployment

The project is Vercel-compatible as-is. No environment variables are required for the current puzzle layer.
