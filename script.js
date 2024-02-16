const playBoard = document.querySelector(".play-board");

let foodX, foodY; //Comida no eixo X e Y
let snakeX = 5,
  snakeY = 10; //cobra no eixo X e Y
let snakeBody = [];

let velocityX = 0,
  velocityY = 0;

const changeFoodPosition = () => {
  //Passar um valor aleatório de 0 - 30 como posição da comida(food)
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  //alterar o valor da velocidade com base na tecla premida
  if (e.key === "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
};

const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX} "></div>`;

  //mudar a posição da comida depois de a cobra a comer, ou seja, verificar se a cobra atingiu a comida
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); //Colocar a posição do alimento na matriz do corpo da cobra
    console.log(snakeBody);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    //deslocar para a frente os valores dos elementos do corpo da cobra em um
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY]; //definir o primeiro elemento do corpo da cobra como a posição atual da cobra

  //atualizar a posição da cabeça da cobra com base na velocidade atual
  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = 0; i < snakeBody.length; i++) {
    //adicionar uma div para cada parte do corpo da cobra
    htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
  }

  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
