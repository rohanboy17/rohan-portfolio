# Rohan Mondal — Full-Stack Developer Portfolio

**Live:** https://rohan-portfolio.vercel.app

A fast, glossy-3D portfolio built with Next.js 16, React Three Fiber and Tailwind CSS v4. It has a hand-modelled clay 3D hero, 3D clip-art throughout, auto-recorded project demo videos, live GitHub activity and a working contact form.

## Tech

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, static + ISR), React 19, TypeScript |
| 3D & motion | Three.js, React Three Fiber, Drei, Framer Motion, Lenis |
| Styling | Tailwind CSS v4, `next/font` (Space Grotesk + Inter) |
| Content | One typed file: `src/content/profile.ts` |
| Email | Resend (`/api/contact`) |
| Deploy | Vercel, GitHub Actions CI (lint + build) |

## Performance

- The 3D scene is code-split and only loads when the browser is idle. A static clip-art poster paints first, so WebGL never blocks the main content.
- The scene stops rendering once it scrolls off screen. Mobile gets a lighter scene at DPR 1, and visitors with reduced motion see the poster only.
- Demo videos are H.264 MP4s (`preload="none"`) that play only while they are on screen.
- Every page is pre-rendered. The GitHub section refreshes once a day through ISR.

## Edit content

Everything visible on the site lives in **`src/content/profile.ts`**. Search for `TODO(rohan)` to find the details that still need filling in.

- **Resume:** put the file at `public/resume.pdf` and set `resumeUrl: "/resume.pdf"`.
- **Photo:** put it at `public/me.png` and set `avatar: "/me.png"`.
- **Projects:** add an entry to `projects`. Set `featured: true` to show it as a large card.

### Record project demo videos

```bash
npx playwright install chromium   # once
npm run record:demos              # every project with a liveUrl
npm run record:demos -- game-arena  # just one project
```

This writes `public/projects/<slug>.jpg`, `public/videos/<slug>.mp4` and `src/content/demo-media.json`. It requires `ffmpeg` on your PATH.

## Run locally

```bash
npm install
npm run dev
```

### Environment variables (optional)

| Name | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sends contact-form emails |
| `CONTACT_TO_EMAIL` | Inbox that receives messages |
| `CONTACT_FROM_EMAIL` | Verified Resend sender (default `onboarding@resend.dev`) |
| `GITHUB_TOKEN` | Raises the GitHub API rate limit for the activity section |

If the email variables are missing, the form still works: it shows the visitor your email address so they can write to you directly.

## Credits

- 3D clip-art: [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) (MIT)
- Brand icons: [Simple Icons](https://simpleicons.org) (CC0)
