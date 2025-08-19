/**
 * Breadth-First Search for unweighted shortest path in an undirected graph.
 * @param {Map<string,string[]>} graph adjacency: hubId -> [neighbor hubIds]
 * @param {string} start
 * @param {string} goal
 * @returns {{path:string[], distance:number}|null}
 */
export function bfsShortestPath(graph, start, goal) {
  if (start === goal) return { path: [start], distance: 0 };

  const queue = [start];
  const visited = new Set([start]);
  const prev = new Map(); // child -> parent

  while (queue.length) {
    const cur = queue.shift();
    for (const nxt of graph.get(cur) || []) {
      if (visited.has(nxt)) continue;
      visited.add(nxt);
      prev.set(nxt, cur);

      if (nxt === goal) {
        // reconstruct path
        const path = [goal];
        let p = goal;
        while (prev.has(p)) {
          p = prev.get(p);
          path.push(p);
        }
        path.reverse();
        return { path, distance: path.length - 1 };
      }
      queue.push(nxt);
    }
  }
  return null; // unreachable
}
