document.addEventListener("DOMContentLoaded",()=>{
    const gameArena = document.getElementById("game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food = {x:300 , y: 200}
    let snake = [{x:160, y:200},{x:140, y:200}, {x:120, y:200}];
    let dx = cellSize;
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
    function moveFood(){
        let newX, newY;
        do{
            newX = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize) )* cellSize;
            newY = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize) )* cellSize;
        } while (snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY));
        food = {x: newX, y: newY}
    }

    function updateSnake(){
        const newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(newHead);
        if (newHead.x === food.x && newHead.y === food.y) {
            //collision
            score += 5;
            moveFood();
            //update food
        } else {snake.pop()}
         
    }
    function isGameOver(){
        for (let i = 1; i < snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
        }
        const ifHittingLeftWall = snake[0].x < 0;
        const ifHittingTopWall = snake[0].y < 0;
        const ifHittingRightWall = snake[0].x >= arenaSize;
        const ifHittingBottomWall = snake[0].y >= arenaSize;

        return ifHittingLeftWall || ifHittingRightWall || ifHittingTopWall || ifHittingBottomWall ;
    }

    function gameLoop(){
        setInterval(() => {
            if(!gameStarted) return;
            if(isGameOver()){
                gameStarted = false;
                alert(`Game is over Score: ${score}`);
                window.location.reload();
                return;
            }
            updateSnake();
            drawScoreBoard();
            drawFoodAndSnake();
            
        }, 500);
    }
    function changeDirection(e){
        const LeftKey = 37;
        const TopKey = 38;
        const RightKey = 39;
        const bottomKey = 40;
        
        const keyPressed = e.keyCode;
        console.log(e, e.keyCode);

        const isGoingUpward = dy == -cellSize;
        const isGoingdownward = dy == cellSize;
        const isGoingLefward = dx == -cellSize;
        const isGoingRightward = dx == cellSize

        if(keyPressed == RightKey && !isGoingLefward){dx = cellSize; dy = 0}
        if(keyPressed == bottomKey && !isGoingUpward) {dx = 0; dy = cellSize}
        if(keyPressed == TopKey && !isGoingdownward)   {dx = 0; dy = -cellSize}
        if(keyPressed == LeftKey && !isGoingRightward) {dx = -cellSize; dy = 0}

    }

    function runGame(){
        if(!gameStarted){
            gameStarted = true;
            gameLoop();
            document.addEventListener('keydown', changeDirection);
        }

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