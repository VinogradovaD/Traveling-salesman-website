import pathLength from "./pathLength.js"

/* Метод ближайшего соседа (nearestNeighbor)

   - nearestNeighbor(distanceMatrix, begin = 1) 
*/

function nearestNeighbor(distanceMatrix, begin = 1) {
  const start = performance.now();

  let bestPath = [begin];

  for (let i = 0; i < distanceMatrix.length - 1; i++) {
    let nextCity = nearestCity(bestPath[i], bestPath, distanceMatrix);
    bestPath.push(nextCity);
  }

  bestPath.push(begin);
  const distance = pathLength(bestPath, distanceMatrix);
  const end = performance.now();

  return { path: bestPath, distance, time: end - start };
}

function nearestCity(currentCity, currentPath, distanceMatrix) {
  let min = Number.MAX_VALUE;
  let nextCity;

  for (let i = 0; i < distanceMatrix.length; i++) {
    if (distanceMatrix[i][currentCity - 1] < min && !!distanceMatrix[i][currentCity - 1] && existInArray((i + 1), currentPath) !== -1) {
      min = distanceMatrix[i][currentCity - 1];
      nextCity = i + 1;
    }
  }

  return nextCity;
}

function existInArray(element, array) {
  for (let i = 0; i < array.length; i++) {
    if (element == array[i]) {
      return -1;
    }
  }
  return 1;
}


function nearestNeighbor2(distanceMatrix) {
  const start = performance.now();
  let minDistance = Number.MAX_VALUE;
  let bestPath = [];

  for (let i = 1; i <= distanceMatrix.length; i++) {
    let currentPath = nearestNeighbor(distanceMatrix, i);

    if (currentPath.distance < minDistance) {
      bestPath = currentPath.path;
      minDistance = currentPath.distance;
    }
  };

  const end = performance.now();

  return { path: bestPath, distance: minDistance, time: end - start };
}

export {nearestNeighbor, nearestNeighbor2}