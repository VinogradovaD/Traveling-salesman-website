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

const selectMethod = document.getElementById('select-method');

const resultField = document.getElementById('result-field');

const useMethodBtns = document.querySelectorAll('.use-method-btn');

let ctx = document.getElementById('viewport').getContext('2d');

let cityCount = 0;

let matrixCountElements = 0;

let matrixInputsRow = [];

let matrixInput = [];

let matrix = [];

let result = {
    path: [],
    pathString: "",
    distance: 0
}

//Смена страниц
function taskPage(event) {
    aboutSection.classList.add('hidden');
    methodsSection.classList.add('hidden');
    mainPageMethodsSection.classList.add('hidden');
    taskSection.classList.remove('hidden');
    mainPageBtn.classList.remove('red-text');
    methodsPageBtn.classList.remove('red-text');
    solvePageBtn.classList.add('red-text');
    window.scroll(0, 0);
    event.preventDefault();
}   
function methodsPage(event) {
    aboutSection.classList.add('hidden');
    mainPageMethodsSection.classList.add('hidden');
    methodsSection.classList.remove('hidden');
    taskSection.classList.add('hidden');
    mainPageBtn.classList.remove('red-text');
    methodsPageBtn.classList.add('red-text');
    solvePageBtn.classList.remove('red-text');
    window.scroll(0, 0);
    event.preventDefault();
}
//...............

//Метод полного перебора
function allCombinations(n){
    var array = [];
    for (let i = 0; i < n; i++) {
        array[i] = i + 1;
    }
    var m=[];
    var combinations = [];
    var indices = [];
    var len=array.length;
    var k = len;
    function run(level){    
      for(var i=0; i < len; i++){            
        if(!indices[i]){            
          indices[i] = true;                
          combinations[level] = array[i];                
          if(level < k - 1){
            run(level + 1, i + 1);
          } else {
            m.push(([]).concat(combinations));
          }                
          indices[i] = false;
        }
      }        
    }    
    run(0);
    return m;
}
function pathLength(path) {
    let len = 0;
    for (let i = 0; i < path.length - 1; i++) {
        len += (Number)(matrix[path[i + 1] - 1][path[i] - 1]);
    }
    return len;
}
function bruteForce() {
    let paths = allCombinations(cityCount);
    let distance = [];
    let minPath = Number.MAX_VALUE;
     let answer = {
        path: [],
        pathString: "",
        distance: 0
    }
    for(let i = 0; i < paths.length; i++) {
        paths[i].push(paths[i][0]);
        distance[i] = pathLength(paths[i]);
        if (distance[i] < minPath) {
            minPath = distance[i];
            answer.path = paths[i];
        }
    }
    answer.distance = minPath;
    for (let i = 0; i < cityCount; i++) {
        answer.pathString += answer.path[i] + "->";
    }
    answer.pathString += answer.path[cityCount];
    return answer;
}
//....................

//Метод ближайшего соседа
function existInArray(element, array) {
    for (let i = 0; i < array.length; i++) {
        if (element == array[i]) {
            return -1;
        }
    }
    return 1;
}
function nearestCity(city, path) {
    let min = Number.MAX_VALUE;
    let nextCity = {
        num: 0,
        distance: 0
    }
    for (let i = 0; i < cityCount; i++) {
        if (matrix[i][city - 1] < min && matrix[i][city - 1] !== 0 && existInArray((i + 1), path) !== -1) {
        min = matrix[i][city - 1];
        nextCity.distance = Number(min);
        nextCity.num = i + 1;
        }
    }
    return nextCity;
} 
function nearestNeighbor(begin) {
    let nextCity = {
        num: 0, 
        distance: 0
    };
    let answer = {
        path: [],
        pathString: "",
        distance: 0
    }
    answer.path[0] = begin;
    answer.pathString = answer.path[0] + '->';
    distance = 0;
    for(let i = 1; i < cityCount; i++) {
        nextCity = nearestCity(answer.path[i - 1], answer.path);
        answer.path[i] = nextCity.num;
        answer.distance += nextCity.distance;
        answer.pathString += answer.path[i] + "->";
    }
    answer.path[cityCount] = begin;
    answer.distance += (Number)(matrix[begin - 1][answer.path[cityCount - 1] - 1]);
    answer.pathString += begin;
    return answer;
}
//.....................

//Метод ближайшего соседа(усов.)
function nearestNeighbor2() {
    let minPath = {
        path: [],
        pathString: "",
        distance: Number.MAX_VALUE
    };
    for (let i = 1; i <= cityCount; i++) {
        currentPath = nearestNeighbor(i);
        console.log(currentPath);
        if (currentPath.distance < minPath.distance) {
            minPath = currentPath;
        }
    };
    return minPath;
}
//..............................

//Метод ветвей и границ
function branchAndBound(A) {
    console.log("branch");
}
//..............................

function drawGraph () {

    (function($){
        var Renderer = function(canvas)
        {
         var canvas = $(canvas).get(0);
         var ctx = canvas.getContext("2d");
         var particleSystem;
       
         var that = {
          init:function(system){
        
           particleSystem = system;
           particleSystem.screenSize(canvas.width, canvas.height); 
           particleSystem.screenPadding(20);
           that.initMouseHandling();
          },
             
          redraw:function(){
  
           ctx.fillStyle = "white"; 
           ctx.fillRect(0,0, canvas.width, canvas.height); 
          
           particleSystem.eachEdge( 
            function(edge, pt1, pt2){ 
             ctx.strokeStyle = "rgba(0,0,0, .333)";
             ctx.lineWidth = 1; 
             ctx.beginPath();  
             ctx.moveTo(pt1.x, pt1.y); 
             ctx.lineTo(pt2.x, pt2.y);
             ctx.stroke();

             ctx.fillStyle = "black";
             ctx.font = 'italic 13px sans-serif';
             ctx.fillText (edge.data.name, (pt1.x + pt2.x) / 2, (pt1.y + pt2.y) / 2);
           });
        
           particleSystem.eachNode( 
            function(node, pt){  
             var w = 10;   
             ctx.fillStyle = "red"; 
             ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w); 
             ctx.fillStyle = "black"; 
             ctx.font = 'italic 13px sans-serif';
             ctx.fillText (node.name, pt.x+8, pt.y+8); 
           });       
          },
         
          initMouseHandling:function(){ 
           var dragged = null;   
           var handler = {
            clicked:function(e){ 
             var pos = $(canvas).offset(); 
             _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top); 
             dragged = particleSystem.nearest(_mouseP);
             if (dragged && dragged.node !== null){
              dragged.node.fixed = true; 
             }
             $(canvas).bind('mousemove', handler.dragged); 
             $(window).bind('mouseup', handler.dropped);  
             return false;
            },
            dragged:function(e){ 
             var pos = $(canvas).offset();
             var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);
        
             if (dragged && dragged.node !== null){
              var p = particleSystem.fromScreen(s);
              dragged.node.p = p; 
             }
        
             return false;
            },
            dropped:function(e){
             if (dragged===null || dragged.node===undefined) return; 
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
       
        $(document).ready(function(){
         sys = arbor.ParticleSystem(1000); 
         sys.parameters({gravity:true}); 
         sys.renderer = Renderer("#viewport") 
       
         for (let i = 0; i < cityCount; i++) {
            sys.addNode(result.path[i]);
            console.log(result.path[i]);
        }
        for (let i = 0; i < cityCount; i++) {    
            sys.addEdge(sys.getNode(result.path[i]), sys.getNode(result.path[i+1]), {name:matrix[result.path[i + 1] - 1][result.path[i] - 1]});
            console.log();
        }
        
           
        })
       
       })(this.jQuery)
       
}

//Считаем ответ
function getAnswer() {
    
    if (cityCount == 0) {
        errorMessage.innerHTML = "Введите количество городов";
    }
    if (matrixCountElements < cityCount*cityCount) {
        errorMessage.innerHTML = "Все поля должны быть заполнены"
    }
    else {
        errorMessage.innerHTML = "";
        switch (selectMethod.value) {
            case 'полного перебора':
                result = bruteForce(matrix);
                break;
            case 'ближайшего соседа':
                result = nearestNeighbor(1);
                break;
            case 'ближайшего соседа (усов.)':
                result = nearestNeighbor2();
                break;
            case 'ветвей и границ':
                branchAndBound();
                break;
        }
    drawGraph();
    resultField.innerHTML = "Маршрут: " + result.pathString + "<br> Длина маршрута: " + result.distance;
    }
}
//..............

//Считывание матрицы
function readMatrix(r, c) {

    errorMessage.innerHTML = '';

    if(!matrix[r]) {
        matrix[r] = new Array();
    }

    if(!matrix[c]) {
        matrix[c] = new Array();
    }

    matrixInput[c][r].value = matrixInput[r][c].value;
    matrix[r][c] = matrixInput[r][c].value;
    matrix[c][r] = matrixInput[c][r].value

    if (matrix[r][c] == '') {
        matrixCountElements--;
        matrixCountElements--;
    } else {
        matrixCountElements++;
        matrixCountElements++;
    }
}
//..................

//Создание полей для матрицы
function createMatrixInputs() {

    cityCount = cityCountInput.value;

    matrixCountElements = cityCount;

    if (cityCount == '') {
        matrixInputs.innerHTML = '';
    }

    if (cityCount < 3 && cityCount != '') {
        errorMessage.innerHTML = "Количество городов не может быть меньше 3";
    }

    else if (cityCount > 30) {
        errorMessage.innerHTML = "Количество городов должно превышать 20";
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
                    matrixInput[i][j].setAttribute("disabled", "disabled");
                    matrixInput[i][j].classList.add('blue-input');
                }

                matrixInput[i][j].addEventListener('input', () => readMatrix(i, j));

                matrixInputsRow[i].appendChild(matrixInput[i][j]);
            }
        }
    }
}

//Клики
solvePageBtn.addEventListener('click', taskPage);
mainPageBtn.addEventListener('click', () => {
    window.location.reload();
});
methodsPageBtn.addEventListener('click', methodsPage);
cityCountInput.addEventListener('input', createMatrixInputs);

btnAnswer.addEventListener('click', getAnswer);

useMethodBtns[0].addEventListener('click', taskPage);
useMethodBtns[0].addEventListener('click', () => {
    selectMethod.value = 'полного перебора';
});
useMethodBtns[1].addEventListener('click', taskPage);
useMethodBtns[1].addEventListener('click', () => {
    selectMethod.value = 'ближайшего соседа';
});
useMethodBtns[2].addEventListener('click', taskPage);
useMethodBtns[2].addEventListener('click', () => {
    selectMethod.value = 'ближайшего соседа (усов.)';
});
useMethodBtns[3].addEventListener('click', taskPage);
useMethodBtns[3].addEventListener('click', () => {
    selectMethod.value = 'ветвей и границ';
});
useMethodBtns[4].addEventListener('click', taskPage);
useMethodBtns[4].addEventListener('click', () => {
    selectMethod.value = 'полного перебора';
});
useMethodBtns[5].addEventListener('click', taskPage);
useMethodBtns[5].addEventListener('click', () => {
    selectMethod.value = 'ближайшего соседа';
});
useMethodBtns[6].addEventListener('click', taskPage);
useMethodBtns[6].addEventListener('click', () => {
    selectMethod.value = 'ближайшего соседа (усов.)';
});
useMethodBtns[7].addEventListener('click', taskPage);
useMethodBtns[7].addEventListener('click', () => {
    selectMethod.value = 'ветвей и границ';
});
