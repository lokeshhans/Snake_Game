document.addEventListener("DOMContentLoaded",()=>{
    const gameArena = document.getElementById("game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStart = false;
    let food = {x:300 , y: 200}
    let snake = [{x:160, y:200},{x:140, y:200}, {x:120, y:200}];
    let dx =cellSize;
    let dy = 0;

    function drawFoodAndSnake(){
        gameArena.innerHTML = ' '; 
        const foodElement = drawDiv(food.x, food.y, 'food');
        snake.forEach((snakeCell)=>{
            const element  = drawDiv(snakeCell.x, snakeCell.y, 'snake');
            gameArena.appendChild(element);
        })
        gameArena.appendChild(foodElement);
    }
    function drawDiv(x, y, className){
        const div = document.createElement('div');
        div.classList.add(className);
        div.style.top =`${y}px`;
        div.style.left =`${x}px`;
        return div;


    }
    function drawScoreBoard(){
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score: ${score}`

    }

    function gameLoop(){
        setInterval(() => {
            drawScoreBoard();
            drawFoodAndSnake()
        }, 1000);
    }

    function runGame(){
        gameStart = true;
        gameLoop();

    }


    function initiateGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        scoreBoard.textContent = '';
        document.body.insertBefore(scoreBoard, gameArena);

        const startButton  = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.classList.add('start-button')
        document.body.appendChild(startButton);


        startButton.addEventListener('click',()=>{
            startButton.style.display = 'none';
            runGame();
        })

    };
    initiateGame();
});