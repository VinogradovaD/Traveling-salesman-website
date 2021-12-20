const aboutSection = document.getElementById('about');

const methodsSection = document.getElementById('methods');

const taskSection = document.getElementById('task');

const solvePageBtn = document.getElementById('solve-page-btn');

const mainPageBtn = document.getElementById('main-page-btn');

const methodsPageBtn = document.getElementById('methods-page-btn');

const cityCountInput = document.getElementById('city-count');

const errorMessage = document.getElementById('error-message');

const matrixInputs = document.getElementById('matrix-inputs');

const btnAnswer = document.getElementById('btn-answer');

const selectMethod = document.getElementById('select-method');

let canvas = document.getElementById('canvas');

let context = canvas.getContext('2d');

let cityCount = 0;

let matrixCountElements = 0;

let matrixInputsRow = new Array();

let matrixInput = new Array();

let matrix = new Array


function taskPage() {
    aboutSection.classList.add('hidden');
    methodsSection.classList.add('hidden');
    taskSection.classList.remove('hidden');
    window.scroll(0, 0);
}

function mainPage() {
    aboutSection.classList.remove('hidden');
    methodsSection.classList.remove('hidden');
    taskSection.classList.add('hidden');
    window.scroll(0, 0);
}


function methodsPage() {
    aboutSection.classList.add('hidden');
    methodsSection.classList.remove('hidden');
    taskSection.classList.add('hidden');
    window.scroll(0, 0);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function drawCircle(x, y, text) {

    context.arc(x, y, 10, 0, Math.PI*2);
    context.fillText(text, x - 3, y + 3);
    context.stroke();   
}

function drawGraph() {
    context.beginPath();
    drawCircle(200, 200, "1");
    drawCircle(200, 200, "1");
    
}

function bruteForce(A) {
    console.log("perebor");
}

function nearestNeighbor(A) {
    console.log("sosed");
}

function nearestNeighbor2(A) {
    console.log("sosed2");
}

function branchAndBound(A) {
    console.log("branch");
}


function getAnswer() {
    
   /* if (matrixCountElements != cityCount*cityCount) {
        errorMessage.innerHTML = "Все поля должны быть заполнены"
    }
    else {*/

        drawGraph();

       /* switch (selectMethod.value) {
            case 'полного перебора':
                bruteForce(matrix);
                break;
            case 'ближайшего соседа':
                nearestNeighbor(matrix);
                break;
            case 'ближайшего соседа (усов.)':
                nearestNeighbor2(matrix);
                break;
            case 'ветвей и границ':
                branchAndBound(matrix);
                break;
        }
        
   }*/
  
}

function readMatrix(r, c) {

    errorMessage.innerHTML = '';

    if(!matrix[r]) {
        matrix[r] = new Array();
    }

    matrix[r][c] = matrixInput[r][c].value;

    if (matrix[r][c] == '') {
        matrixCountElements--;
    } else {
        matrixCountElements++;
    }
}

function createMatrixInputs() {

    cityCount = cityCountInput.value;

    matrixCountElements = cityCount;

    if (cityCount == '') {
        matrixInputs.innerHTML = '';
    }

    if (cityCount < 3 && cityCount != '') {
        errorMessage.innerHTML = "Количество городов не может быть меньше 3";
    }

    else if (cityCount > 10) {
        errorMessage.innerHTML = "Количество городов должно превышать 10";
    }

    else {
        errorMessage.innerHTML = "";

        for (let i = 0; i < cityCount; i++) {
            matrixInputsRow[i] = document.createElement('div');
            matrixInputs.appendChild(matrixInputsRow[i]);
            matrixInput[i] = new Array(4);
            for (let j = 0; j < cityCount; j++) {

                matrixInput[i][j] = document.createElement('input');
                matrixInput[i][j].setAttribute("type", "number");

                if (i == j) { 
                    matrixInput[i][j].value = 0;
                    matrixInput[i][j].setAttribute("disabled", "disabled");
                }

                matrixInput[i][j].addEventListener('input', () => readMatrix(i, j));

                matrixInputsRow[i].appendChild(matrixInput[i][j]);
            }
        }
    }
}

solvePageBtn.addEventListener('click', taskPage);

mainPageBtn.addEventListener('click', mainPage);

methodsPageBtn.addEventListener('click', methodsPage);

cityCountInput.addEventListener('input', createMatrixInputs);

btnAnswer.addEventListener('click', getAnswer);