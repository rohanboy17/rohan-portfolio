<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project notes

- This is Rohan's personal portfolio. All visible content lives in `src/content/profile.ts`. Change content there, not in components.
- Recorded demo media is merged in from `src/content/demo-media.json`, which `npm run record:demos` writes.
- The 3D hero is `src/components/3d/ClayScene.tsx`. It is loaded lazily by `ClayStage.tsx`, which keeps a static poster as the fallback. Keep the scene procedural, with no downloaded models or HDRs, so it stays fast.
- `BrandIcon` imports all of simple-icons. Use it only in server components so the icon data never reaches the client bundle.
- Before pushing, run `npm run lint` and `npm run build`. CI runs both steps on Node 24.
