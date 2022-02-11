const aboutSection = document.getElementById('about');
const methodsSection = document.getElementById('methods');
const taskSection = document.getElementById('task');
const solvePageBtn = document.getElementById('solve-page-btn');
const mainPageMethodsSection = document.getElementById('main-page-methods');
const mainPageBtn = document.getElementById('main-page-btn');
const methodsPageBtn = document.getElementById('methods-page-btn');
const cityCountInput = document.getElementById('city-count');
const errorMessage = document.getElementById('error-message');
const matrixInputs = document.getElementById('matrix-inputs');
const btnAnswer = document.getElementById('btn-answer');
const btnClean = document.getElementById('btn-clean');
const selectMethod = document.getElementById('select-method');
const resultField = document.getElementById('result-field');
const useMethodBtns = document.querySelectorAll('.use-method-btn');

let cityCount = 0;
let matrixCountElements = 0;
let matrixInputsRow = [];
let matrixInput = [];
let matrix = [];
let result;

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

function generateAnswer(result) {
  return `Маршрут: ${result.path.join('->')}<br>Длина маршрута: ${result.distance}<br>Время работы алгоритма: ${result.time}мс`;
}

function drawGraph() {
  (function ($) {
    let Renderer = function (canvas) {
      var canvas = $(canvas).get(0);
      let ctx = canvas.getContext("2d");
      let particleSystem;

      let that = {
        init: function (system) {

          particleSystem = system;
          particleSystem.screenSize(canvas.width, canvas.height);
          particleSystem.screenPadding(20);
          that.initMouseHandling();
        },

        redraw: function () {

          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          particleSystem.eachEdge(
            function (edge, pt1, pt2) {
              ctx.strokeStyle = "rgba(0,0,0, .333)";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(pt1.x, pt1.y);
              ctx.lineTo(pt2.x, pt2.y);
              ctx.stroke();

              ctx.fillStyle = "black";
              ctx.font = 'italic 13px sans-serif';
              ctx.fillText(edge.data.name, (pt1.x + pt2.x) / 2, (pt1.y + pt2.y) / 2);
            });

          particleSystem.eachNode(
            function (node, pt) {
              let w = 10;
              ctx.fillStyle = "red";
              ctx.fillRect(pt.x - w / 2, pt.y - w / 2, w, w);
              ctx.fillStyle = "black";
              ctx.font = 'italic 13px sans-serif';
              ctx.fillText(node.name, pt.x + 8, pt.y + 8);
            });
        },

        initMouseHandling: function () {
          let dragged = null;
          let handler = {
            clicked: function (e) {
              let pos = $(canvas).offset();
              _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top);
              dragged = particleSystem.nearest(_mouseP);
              if (dragged && dragged.node !== null) {
                dragged.node.fixed = true;
              }
              $(canvas).bind('mousemove', handler.dragged);
              $(window).bind('mouseup', handler.dropped);
              return false;
            },
            dragged: function (e) {
              let pos = $(canvas).offset();
              let s = arbor.Point(e.pageX - pos.left, e.pageY - pos.top);

              if (dragged && dragged.node !== null) {
                let p = particleSystem.fromScreen(s);
                dragged.node.p = p;
              }

              return false;
            },
            dropped: function (e) {
              if (dragged === null || dragged.node === undefined) return;
              if (dragged.node !== null) dragged.node.fixed = false;
              dragged = null;
              $(canvas).unbind('mousemove', handler.dragged);
              $(window).unbind('mouseup', handler.dropped);
              _mouseP = null;
              return false;
            }
          }

          $(canvas).mousedown(handler.clicked);
        },

      }
      return that;
    }

    $(document).ready(function () {
      sys = arbor.ParticleSystem(1000);
      sys.parameters({ gravity: true });
      sys.renderer = Renderer("#viewport");

      console.log(sys);

      for (let i = 0; i < cityCount; i++) {
        sys.addNode(result.path[i]);
      }
      for (let i = 0; i < cityCount; i++) {
        sys.addEdge(sys.getNode(result.path[i]), sys.getNode(result.path[i + 1]), { name: matrix[result.path[i + 1] - 1][result.path[i] - 1] });
      }
    })

  })(this.jQuery)
}


//Считаем ответ
function getAnswer() {

  if (!cityCount) {
    errorMessage.innerHTML = "Введите количество городов";
  } else if (matrixCountElements < cityCount * cityCount) {
    errorMessage.innerHTML = "Все поля должны быть заполнены";
  } else {
    errorMessage.innerHTML = "";

    switch (selectMethod.value) {
      case 'полного перебора':
        result = bruteForce(matrix);
        break;
      case 'ближайшего соседа':
        result = nearestNeighbor(matrix);
        break;
      case 'ближайшего соседа (усов.)':
        result = nearestNeighbor2(matrix);
        break;
    }

    drawGraph();
    resultField.innerHTML = generateAnswer(result)
  }
}

//Считывание матрицы
function readMatrix(r, c) {
  errorMessage.innerHTML = '';

  if (!matrix[r]) {
    matrix[r] = new Array();
  }

  if (!matrix[c]) {
    matrix[c] = new Array();
  }

  matrixInput[c][r].value = matrixInput[r][c].value;
  matrix[r][c] = matrixInput[r][c].value;
  matrix[c][r] = matrixInput[c][r].value

  if (matrix[r][c] == '') {
    matrixCountElements -= 2;
  } else {
    matrixCountElements += 2;
  }

}

//Создание полей для матрицы
function createMatrixInputs() {
  cityCount = cityCountInput.value;
  matrixCountElements = cityCount;

  if (!cityCount) {
    matrixInputs.innerHTML = '';
  }

  if (cityCount < 3) {
    errorMessage.innerHTML = 'Количество городов не может быть меньше 3';
  }

  if (cityCount > 30) {
    errorMessage.innerHTML = 'Количество городов не должно превышать 20';
  }

  if (cityCount && cityCount >= 3 && cityCount <= 30) {
    errorMessage.innerHTML = '';
    matrixInputs.innerHTML = '';

    for (let i = 0; i < cityCount; i++) {
      matrixInputsRow[i] = document.createElement('div');
      matrixInputs.appendChild(matrixInputsRow[i]);
      matrixInput[i] = new Array(4);

      for (let j = 0; j < cityCount; j++) {
        matrixInput[i][j] = document.createElement('input');
        matrixInput[i][j].setAttribute("type", "number");

        if (i == j) {
          matrixInput[i][j].setAttribute("disabled", "disabled");
          matrixInput[i][j].classList.add('blue-input');
        }

        matrixInput[i][j].addEventListener('input', () => readMatrix(i, j));
        matrixInputsRow[i].appendChild(matrixInput[i][j]);
      }
    }
  }
}

function cleanForm() {
}

function setSelectMethod(numOfMethod) {

  switch (numOfMethod) {
    case '1':
      selectMethod.value = 'полного перебора';
      break;
    case '2':
      selectMethod.value = 'ближайшего соседа';
      break;
    case '3':
      selectMethod.value = 'ближайшего соседа (усов.)';
      break;
    case '4':
      selectMethod.value = 'ветвей и границ';
      break;
  }
}

function taskPage() {
  aboutSection.classList.add('hidden');
  methodsSection.classList.add('hidden');
  mainPageMethodsSection.classList.add('hidden');
  taskSection.classList.remove('hidden');
  mainPageBtn.classList.remove('red-text');
  methodsPageBtn.classList.remove('red-text');
  solvePageBtn.classList.add('red-text');
  window.scroll(0, 0);
}

function methodsPage() {
  aboutSection.classList.add('hidden');
  mainPageMethodsSection.classList.add('hidden');
  methodsSection.classList.remove('hidden');
  taskSection.classList.add('hidden');
  mainPageBtn.classList.remove('red-text');
  methodsPageBtn.classList.add('red-text');
  solvePageBtn.classList.remove('red-text');
  window.scroll(0, 0);
}

mainPageBtn.addEventListener('click', () => {
  window.location.reload();
});

solvePageBtn.addEventListener('click', taskPage);

methodsPageBtn.addEventListener('click', methodsPage);

cityCountInput.addEventListener('input', createMatrixInputs);

btnAnswer.addEventListener('click', getAnswer);

btnClean.addEventListener('click', cleanForm);

useMethodBtns.forEach((item) => {
  item.addEventListener('click', e => {
    taskPage(e);
    const dataAttribute = e.target.dataset.method;
    setSelectMethod(dataAttribute);
  });
}); 
