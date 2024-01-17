const gameContainer = document.querySelector('.game-container');
const snake = document.querySelector('.snake');
const food = document.querySelector('.food');
const superFood = document.querySelector('.super-food');
console.log(superFood)

const levelSelect = document.getElementById('level');
const radioBtnYes = document.querySelector('.radio-yes');
const radioBtnNo = document.querySelector('.radio-no');

radioBtnNo.addEventListener('change', () => {
    radioBtnNo.classList.add('checked');
    radioBtnYes.classList.remove('checked')
})

radioBtnYes.addEventListener('change', () => {
    if (!radioBtnYes.classList.contains('checked')) {
            radioBtnYes.classList.add('checked');
    radioBtnNo.classList.remove('checked')
    }

})

levelSelect.addEventListener('change', onLevelChange);



const gridSize = 20;
const superGridSize = 40;

let snakeX = 0;
let snakeY = 0;

let foodX = 0;
let foodY = 0;

let superFoodX = null;
let superFoodY = null;

let dx = gridSize;
let dy = 0;

let foodEaten = false;

let isGameRunning = false;

let gameInterval;

function onLevelChange() {
    levelSelect.blur()
    return levelSelect.value
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

let timerId;

function updateFoodPosition() {

    foodX = Math.floor(Math.random() * (gameContainer.clientWidth / gridSize)) * gridSize;
    foodY = Math.floor(Math.random() * (gameContainer.clientHeight / gridSize)) * gridSize;
    food.style.top = foodY + 'px';
    food.style.left = foodX + 'px';
}

function updateSuperFoodPosition() {

    superFoodX = Math.floor(Math.random() * (gameContainer.clientWidth / superGridSize)) * superGridSize;
    superFoodY = Math.floor(Math.random() * (gameContainer.clientHeight / superGridSize)) * superGridSize;
    superFood.style.top = superFoodY  + 'px';
    superFood.style.left = superFoodX  + 'px' ; 
}

function startGame() {
    isGameRunning = true;
    // updateFoodPosition();
    gameInterval = setInterval(moveSnake,onLevelChange())
}

function endGame() {
    alert('Game is over');
    clearInterval(gameInterval);
    isGameRunning = false;
    location.reload();
}

function moveSnake() {
    snakeX += dx;
    snakeY += dy;
    if (radioBtnYes.checked) {
        if (snakeX < 0 || snakeX >= gameContainer.clientWidth || snakeY < 0 || snakeY >= gameContainer.clientHeight) {
            endGame()
            return
        }
    } else if (radioBtnNo.checked) {

        if (snakeX >= gameContainer.clientWidth) {
            snakeX = 0
        }
        if (snakeX < 0) {
            snakeX = gameContainer.clientWidth - gridSize;
        }
    
        if (snakeY >= gameContainer.clientHeight) {
            snakeY = 0
        }
    
        if (snakeY < 0) {
            snakeY = gameContainer.clientHeight - gridSize;
        }
    }
    
    if (
        (superFoodX === snakeX && superFoodY === snakeY)
       ||  (superFoodX === snakeX - 20 && superFoodY === snakeY - 20)

    ) {
     
        clearTimeout(timerId)
        const fragment = document.createDocumentFragment();
        for (let i = 0; i <= 3; i += 1) {
            const newSegment = document.createElement('div');
            newSegment.className = "snake snake-segment";
            newSegment.style.left = snakeX + 'px';
            newSegment.style.top = snakeY + 'px';
            fragment.appendChild(newSegment)
        }
        gameContainer.appendChild(fragment)
        foodEaten = true;
        
        if (randomInteger(1, 6) === 2 || randomInteger(1, 6) === 4 || randomInteger(1, 6) === 6) {
            updateSuperFoodPosition();
            food.style.display = 'none';
            superFood.style.display = 'block'
            timerId =  setTimeout(() => {
             superFoodX = null;
              superFoodY = null;
                updateFoodPosition();
            food.style.display = 'block';
            superFood.style.display = 'none' 
            },5000)
        } else {
            updateFoodPosition();
            clearTimeout(timerId)
            food.style.display = 'block';
            superFood.style.display = 'none'
        }
       
    }
    
    else if (snakeX === foodX && snakeY === foodY) {
        foodEaten = true;
        if (randomInteger(1, 6) === 2 || randomInteger(1, 6) === 4 || randomInteger(1, 6) === 6) {
            updateSuperFoodPosition();
               food.style.display = 'none';
            superFood.style.display = 'block';
          timerId =  setTimeout(() => {
             superFoodX = null;
              superFoodY = null;
              updateFoodPosition();
            food.style.display = 'block';
            superFood.style.display = 'none' 
            },5000)
        } else {
            updateFoodPosition();
            clearTimeout(timerId)
            food.style.display = 'block';
            superFood.style.display = 'none'
        }
 
    }

    const newSegment = document.createElement('div');
    newSegment.className = "snake snake-segment";

    newSegment.style.left = snakeX + 'px';
    newSegment.style.top = snakeY + 'px';

    gameContainer.appendChild(newSegment)
   
    if (!foodEaten) {
        const segments = document.querySelectorAll('.snake-segment');
        if (segments.length > 1) {
            gameContainer.removeChild(segments[0]);
        }
    } else {
        foodEaten = false;
    }
}

document.addEventListener('keydown', (evt) => {
    if (!isGameRunning) {
        startGame();
    }
    switch (evt.key) {
        case 'ArrowRight':
            if (dx !== -gridSize) {
                dx = gridSize;
                dy = 0
            }
            break;
        case 'ArrowLeft':
            if (dx !== gridSize) {
                dx = -gridSize;
                dy = 0;
            }
            break;
        case 'ArrowUp':
            if (dy !== gridSize) {
                dx = 0;
                dy = -gridSize;
            }
            break;
        case 'ArrowDown':
            if (dy !== -gridSize) {
                dx = 0;
                dy = gridSize;
            }
            break;
    }
})

 if (randomInteger(1, 6) === 2 || randomInteger(1, 6) === 4 || randomInteger(1, 6) === 6) {
     updateSuperFoodPosition();
     food.style.display = 'none';
     superFood.style.display = 'block'
       timerId =  setTimeout(() => {
             superFoodX = null;
              superFoodY = null;
                updateFoodPosition();
            food.style.display = 'block';
            superFood.style.display = 'none' 
            },5000)
 } else {
     updateFoodPosition();
    clearTimeout(timerId)
     superFood.style.display = "none";
     food.style.display = 'block';
}

