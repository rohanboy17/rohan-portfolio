import Image from "next/image";
import { Star } from "lucide-react";
import { getGitHubActivity } from "@/lib/github";
import SectionHeading from "@/components/ui/SectionHeading";
import BrandIcon from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/site/MotionPrimitives";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-sky",
  JavaScript: "bg-butter",
  CSS: "bg-lilac",
  HTML: "bg-peach",
  PHP: "bg-pink",
};

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default async function GitHubActivity() {
  const data = await getGitHubActivity();
  if (!data) return null;
  const { user, repos, languages, deployed } = data;
  const totalLang = languages.reduce((n, [, c]) => n + c, 0) || 1;

  return (
    <section id="github" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Open source"
          title="Latest on GitHub."
          description="Live from the GitHub API — most of my client work lives in private repos."
          clip="sparkles"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="clay flex h-full flex-col rounded-[32px] p-6 transition hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-4">
                <Image src={user.avatar_url} alt="" width={64} height={64} className="rounded-2xl" />
                <div>
                  <p className="flex items-center gap-2 font-display text-xl font-semibold">
                    <BrandIcon slug="github" size={18} /> @{user.login}
                  </p>
                  <p className="text-sm text-muted">On GitHub since {new Date(user.created_at).getFullYear()}</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/[0.04] p-4">
                  <p className="font-display text-3xl font-semibold">{user.public_repos}</p>
                  <p className="text-sm text-muted">Public repos</p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] p-4">
                  <p className="font-display text-3xl font-semibold">{deployed}</p>
                  <p className="text-sm text-muted">Deployed live</p>
                </div>
              </div>
              {languages.length ? (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Top languages</p>
                  <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-white/5">
                    {languages.map(([lang, count]) => (
                      <span
                        key={lang}
                        className={LANG_COLORS[lang] ?? "bg-mint"}
                        style={{ width: `${(count / totalLang) * 100}%` }}
                      />
                    ))}
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                    {languages.map(([lang]) => (
                      <li key={lang} className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${LANG_COLORS[lang] ?? "bg-mint"}`} />
                        {lang}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <p className="mt-auto pt-6 text-sm font-semibold text-lilac">View profile →</p>
            </a>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {repos.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.05}>
                <a
                  href={r.homepage || r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="clay flex h-full flex-col rounded-[24px] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.05]"
                >
                  <p className="font-display font-semibold">{r.name}</p>
                  <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted">
                    {r.description || "Live project — click to open."}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                    {r.language ? (
                      <span className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${LANG_COLORS[r.language] ?? "bg-mint"}`} />
                        {r.language}
                      </span>
                    ) : null}
                    {r.stargazers_count ? (
                      <span className="flex items-center gap-1">
                        <Star size={12} /> {r.stargazers_count}
                      </span>
                    ) : null}
                    <span>Updated {timeAgo(r.pushed_at)}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
