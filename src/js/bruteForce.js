import pathLength from "./pathLength.js"

/* Метод полного перебора (bruteForce)

   - bruteForce(distanceMatrix) сравнивает длину каждого из возможных путей и возвращает 
   объект с оптимальным путем и его длиной.

   - allCombinations(n) возвращает всевозможные комбинации чисел от 1 до n.
*/

function bruteForce(distanceMatrix) {
  const start = performance.now();
  let allPaths = allCombinations(distanceMatrix.length);
  let minDistance = Number.MAX_VALUE;
  let bestPath = [];

  allPaths.forEach(el => {
    if (pathLength(el, distanceMatrix) < minDistance) {
      minDistance = pathLength(el, distanceMatrix);
      bestPath = el;
    }
  });

  const end = performance.now();

  return { path: bestPath, distance: minDistance, time: end - start };
}

function allCombinations(n) {
  let result = [];
  let combination = [];
  let indices = [];

  function run(level) {
    for (let i = 0; i < n; i++) {

      if (!indices[i]) {
        indices[i] = true;
        combination[level] = i + 1;

        if (level < n - 1) {
          run(level + 1, i + 1);
        } else {
          result.push(([]).concat(combination).concat(combination[0]));
        }
        indices[i] = false;
      }
    }
  }
  run(0);
  return result;
}

export default bruteForce