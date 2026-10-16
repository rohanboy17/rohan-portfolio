const USER = "rohanboy17";
const REVALIDATE = 60 * 60 * 24; // refresh once a day

export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

export type GitHubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  created_at: string;
};

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        // Optional: raises the rate limit. Never exposed to the browser.
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Public GitHub profile + most recently pushed public repos. Returns null if GitHub is unreachable. */
export async function getGitHubActivity() {
  const [user, repos] = await Promise.all([
    gh<GitHubUser>(`/users/${USER}`),
    gh<GitHubRepo[]>(`/users/${USER}/repos?sort=pushed&per_page=30&type=owner`),
  ]);
  if (!user || !repos) return null;

  // Skip forks, the profile README repo and practice clones.
  const own = repos.filter((r) => !r.fork && r.name !== USER && !/clone/i.test(r.name));
  const deployed = own.filter((r) => r.homepage).length;
  const languages = Object.entries(
    own.reduce<Record<string, number>>((acc, r) => {
      if (r.language) acc[r.language] = (acc[r.language] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return { user, repos: own.slice(0, 6), languages, deployed };
}
