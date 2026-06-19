export const revalidate = 3600; // ISR: refresh every hour

const GITHUB_USERNAME = "anushkaadak2684";

export async function GET() {
  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        { headers: { Accept: "application/vnd.github.v3+json" } }
      ),
      // Public contributions API — no auth required
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
      ),
    ]);

    if (!userRes.ok) {
      return Response.json({ error: "GitHub user not found" }, { status: 404 });
    }

    const user = await userRes.json();
    const repos: { stargazers_count: number }[] = reposRes.ok
      ? await reposRes.json()
      : [];

    const stars = Array.isArray(repos)
      ? repos.reduce((acc, r) => acc + (r.stargazers_count ?? 0), 0)
      : 0;

    // Contribution graph: flat array of { date, count, level } for last year
    let contribDays: { date: string; count: number; level: number }[] = [];
    let totalLastYear = 0;

    if (contribRes.ok) {
      const contribData = await contribRes.json();
      contribDays = contribData.contributions ?? [];
      totalLastYear =
        contribData.total?.lastYear ?? contribData.total?.["2025"] ?? 0;
    }

    // Build 26-week grid (most recent 26 weeks) from flat contribution days
    // grid[weekIndex][dayOfWeek] = level (0-4)
    const today = new Date();
    const grid: number[][] = Array.from({ length: 26 }, () =>
      Array(7).fill(0)
    );

    contribDays.forEach(({ date, level }) => {
      const d = new Date(date);
      const diffDays = Math.floor(
        (today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays < 0 || diffDays > 182) return; // only last 26 weeks
      const weekIndex = 25 - Math.floor(diffDays / 7);
      const dayIndex = d.getDay(); // 0=Sun
      if (weekIndex >= 0 && weekIndex < 26) {
        grid[weekIndex][dayIndex] = level ?? 0;
      }
    });

    return Response.json({
      repos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      stars,
      contributions: totalLastYear || repos.length * 8, // fallback estimate
      grid,
      username: GITHUB_USERNAME,
    });
  } catch {
    return Response.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
