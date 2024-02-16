const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY; //Comida no eixo X e Y
let snakeX = 5,
  snakeY = 10; //cobra no eixo X e Y
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervalId;
let score = 0;

//obter a pontuação máxima do armazenamento local
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `Pontuação Elevada: ${highScore}`;

const changeFoodPosition = () => {
  //Passar um valor aleatório de 0 - 30 como posição da comida(food)
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  //limpar o temporizador e recarregar a página no fim do jogo
  clearInterval(setIntervalId);
  alert("Game Over! Pressione OK para voltar...");
  location.reload();
};

const changeDirection = (e) => {
  //alterar o valor da velocidade com base na tecla premida
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

controls.forEach((key) => {
  //chamar changeDirection em cada clique e passar o valor do conjunto de dados chave como um objeto
  key.addEventListener("click", () =>
    changeDirection({ key: key.dataset.key })
  );
});

const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX} "></div>`;

  //mudar a posição da comida depois de a cobra a comer, ou seja, verificar se a cobra atingiu a comida
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); //Colocar a posição do alimento na matriz do corpo da cobra
    score++; //aumentar a pontuação em 1

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerHTML = `Pontuação: ${score}`;
    highScoreElement.innerHTML = `Pontuação Elevada: ${highScore}`; //
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    //deslocar para a frente os valores dos elementos do corpo da cobra em um
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY]; //definir o primeiro elemento do corpo da cobra como a posição atual da cobra

  //atualizar a posição da cabeça da cobra com base na velocidade atual
  snakeX += velocityX;
  snakeY += velocityY;

  //verificar se a cabeça da cobra está fora da parede e, em caso afirmativo, definir gameOver como verdadeiro
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    //adicionar uma div para cada parte do corpo da cobra
    htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;

    //verificar se a cabeça da cobra atingiu o corpo; em caso afirmativo, definir gameOver como verdadeiro
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
