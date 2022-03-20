/* Функция pathLength 

  - принимает массив с номерами городов и матрицу расстояний между ними.
  - возвращает длину пути.
*/

function pathLength(path, distanceMatrix) {
  let length = 0;

  for (let i = 0; i < path.length - 1; i++) {
    length += (Number)(distanceMatrix[path[i + 1] - 1][path[i] - 1]);
  }

  return length;
}

export default pathLength