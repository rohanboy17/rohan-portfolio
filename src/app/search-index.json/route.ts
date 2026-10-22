import { buildSearchIndex } from "@/lib/search-index";

// Built once at deploy time and served as a static file; browsers fetch it only when searching.
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
