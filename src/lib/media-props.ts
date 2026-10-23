import type { Project } from "@/content/profile";

/** The only project fields ProjectMedia (a client component) needs. */
export type MediaProject = Pick<Project, "title" | "accent" | "clip" | "liveUrl" | "mediaLabel" | "poster" | "video">;

/**
 * Pass this to ProjectMedia instead of the whole project: client-component props are
 * serialized into the page, and full projects (case studies, highlights…) bloated the HTML.
 */
export const mediaProps = (p: Project): MediaProject => ({
  title: p.title,
  accent: p.accent,
  clip: p.clip,
  liveUrl: p.liveUrl,
  mediaLabel: p.mediaLabel,
  poster: p.poster,
  video: p.video,
});
