export const revalidate = 3600; // ISR: refresh every hour

const LEETCODE_USERNAME = "anushka_adak";

// LeetCode public GraphQL endpoint
const LC_GRAPHQL = "https://leetcode.com/graphql";

const STATS_QUERY = `
  query userStats($username: String!) {
    matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      languageProblemCount {
        languageName
        problemsSolved
      }
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch(LC_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query: STATS_QUERY,
        variables: { username: LEETCODE_USERNAME },
      }),
    });

    if (!res.ok) throw new Error(`LeetCode responded ${res.status}`);

    const json = await res.json();
    const user = json?.data?.matchedUser;

    if (!user) throw new Error("User not found on LeetCode");

    // Parse submission counts
    const counts: Record<string, number> = {};
    for (const entry of user.submitStats?.acSubmissionNum ?? []) {
      counts[entry.difficulty] = entry.count;
    }

    const easy   = counts["Easy"]   ?? 0;
    const medium = counts["Medium"] ?? 0;
    const hard   = counts["Hard"]   ?? 0;
    const total  = counts["All"]    ?? easy + medium + hard;

    // Language breakdown — top 4 by problems solved
    const languages: { name: string; count: number }[] = (
      user.languageProblemCount ?? []
    )
      .sort(
        (a: { problemsSolved: number }, b: { problemsSolved: number }) =>
          b.problemsSolved - a.problemsSolved
      )
      .slice(0, 4)
      .map((l: { languageName: string; problemsSolved: number }) => ({
        name: l.languageName,
        count: l.problemsSolved,
      }));

    return Response.json({ total, easy, medium, hard, languages, username: LEETCODE_USERNAME });
  } catch (err) {
    // Graceful fallback to spec values
    console.error("LeetCode fetch error:", err);
    return Response.json({
      total: 100,
      easy: 45,
      medium: 42,
      hard: 13,
      languages: [
        { name: "Java", count: 48 },
        { name: "Python", count: 32 },
        { name: "C++", count: 20 },
      ],
      username: LEETCODE_USERNAME,
      fallback: true,
    });
  }
}
