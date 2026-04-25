/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if (
    !Array.isArray(matches) ||
    matches === null ||
    matches === undefined ||
    matches.length === 0
  )
    return [];
  const obj = {};
  for (const element of matches) {
    if (!(element.team1 in obj)) {
      obj[element.team1] = {
        team: element.team1,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
    if (!Object.hasOwn(obj, element.team2)) {
      obj[element.team2] = {
        team: element.team2,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
    obj[element.team1].played++;
    obj[element.team2].played++;
    if (element.result === "win") {
      if (element.winner === element.team1) {
        obj[element.team1].won++;
        obj[element.team1].points += 2;
        obj[element.team2].lost++;
      } else {
        obj[element.team2].won++;
        obj[element.team2].points += 2;
        obj[element.team1].lost++;
      }
    } else if (element.result === "tie") {
      obj[element.team1].points++;
      obj[element.team2].points++;
      obj[element.team1].tied++;
      obj[element.team2].tied++;
    } else if (element.result === "no_result") {
      obj[element.team1].points++;
      obj[element.team2].points++;
      obj[element.team1].noResult++;
      obj[element.team2].noResult++;
    }
  }
  const arr = Object.values(obj);
  arr.sort((a, b) => {
    if (a.points !== b.points) return b.points - a.points;
    // return a.team.localeCompare(b.team);
    return a.team < b.team ? -1 : a.team > b.team ? 1 : 0;
  });
  return arr;
}
