import pathLength from "./pathLength"

function nearestNeighbor(distanceMatrix) {
  const start = performance.now();
  let minDistance = Number.MAX_VALUE;
  let bestPath = [];

  for (let i = 1; i <= distanceMatrix.length; i++) {
    let currentPath = nearestNeighborWithBegin(distanceMatrix, i);

    if (currentPath.distance < minDistance) {
      bestPath = currentPath.path;
      minDistance = currentPath.distance;
    }
  };

  const end = performance.now();

  return { path: bestPath, distance: minDistance, time: end - start };
}

function nearestNeighborWithBegin(distanceMatrix, begin = 1) {
  let bestPath = [begin];

  for (let i = 0; i < distanceMatrix.length - 1; i++) {
    let nextCity = nearestCity(bestPath[i], bestPath, distanceMatrix);
    bestPath.push(nextCity);
  }

  bestPath.push(begin);
  const distance = pathLength(bestPath, distanceMatrix);
  
  return { path: bestPath, distance };
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

export default nearestNeighbor