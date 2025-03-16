const difficultyMenu = document.getElementById("difficulty-menu");
const gameContainer = document.getElementById("game-container");
const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("time");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const submitAnswer = document.getElementById("submit-answer");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score-value");
const questionTimerDisplay = document.getElementById("question-time");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");
const winScreen = document.getElementById("win-screen");
const winScoreDisplay = document.getElementById("win-score");
const winRestartButton = document.getElementById("win-restart-button");

let timeLeft = 60;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let timer;
let questionTimer;
let score = 0;
let questionActive = false;

// Datos de las cartas
const cardsData = [
  { name: "Diapositiva1", img: "img/Diapositiva1.png" },
  { name: "Diapositiva2", img: "img/Diapositiva2.png" },
  { name: "Diapositiva3", img: "img/Diapositiva3.png" },
  { name: "Diapositiva4", img: "img/Diapositiva4.png" },
  { name: "Diapositiva5", img: "img/Diapositiva5.png" },
  { name: "Diapositiva6", img: "img/Diapositiva6.png" },
  { name: "Diapositiva7", img: "img/Diapositiva7.png" },
  { name: "Diapositiva8", img: "img/Diapositiva8.png" },
  { name: "Diapositiva9", img: "img/Diapositiva9.png" },
  { name: "Diapositiva10", img: "img/Diapositiva10.png" },
  { name: "Diapositiva11", img: "img/Diapositiva11.png" },
  { name: "Diapositiva12", img: "img/Diapositiva12.png" },
  { name: "Diapositiva13", img: "img/Diapositiva13.png" },
  { name: "Diapositiva14", img: "img/Diapositiva14.png" },
  { name: "Diapositiva15", img: "img/Diapositiva15.png" },
  { name: "Diapositiva16", img: "img/Diapositiva16.png" },
  { name: "Diapositiva17", img: "img/Diapositiva17.png" },
  { name: "Diapositiva18", img: "img/Diapositiva18.png" },
];

// Preguntas y respuestas
const questions = [
  { question: "¿Qué lenguaje estructura la web?", answer: "html" },
  { question: "¿Qué lengua le da estilo a la web?", answer: "css" },
  { question: "¿Qué lenguaje da interactividad a la web?", answer: "javascript" },
  { question: "¿Parte visible del sitio web?", answer: "frontend" },
  { question: "¿Parte del servidor que maneja datos?", answer: "backend" },
  { question: "¿Aplicación para ver páginas web?", answer: "navegador" },
  { question: "¿Estructura base para desarrollar aplicaciones web?", answer: "framework" },
  { question: "¿Sitio web que se adapta a pantallas?", answer: "responsivo" },
  { question: "¿Software que almacena y entrega páginas web?", answer: "servidor" },
  { question: "¿Conjunto de reglas para comunicación entre aplicaciones?", answer: "api" },
  { question: "¿Qué significa 'URL'?", answer: "dirección" },
  { question: "¿Qué es 'HTTP'?", answer: "protocolo" },
  { question: "¿Qué es un 'link'?", answer: "enlace" },
  { question: "¿Qué es un 'tag' en HTML?", answer: "etiqueta" },
  { question: "¿Qué es un 'id' en CSS?", answer: "identificador" }
];

// Función para iniciar el juego según la dificultad
function startGame(difficulty) {
  let gridSize, totalCards;

  switch (difficulty) {
    case "easy":
      gridSize = 4; // 4x4 para 16 cartas (8 pares)
      timeLeft = 60; // 60 segundos
      break;
    case "medium":
      gridSize = 4; // 4x4 para 16 cartas (8 pares)
      timeLeft = 30; // 30 segundos
      break;
    case "hard":
      gridSize = 6; // 6x6 para 36 cartas (18 pares)
      timeLeft = 20; // 20 segundos
      break;
  }

  totalCards = gridSize * gridSize;
  const selectedCards = cardsData.slice(0, totalCards / 2); // Selecciona las cartas necesarias

  // Duplicar y mezclar las cartas
  let cards = [...selectedCards, ...selectedCards];
  cards.sort(() => Math.random() - 0.5);

  // Limpiar el tablero
  gameBoard.innerHTML = "";

  // Crear y mostrar las cartas en el tablero
  cards.forEach((cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = cardData.name;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${cardData.img}" alt="${cardData.name}">
        </div>
        <div class="card-back">
          <img src="img/card-back.png" alt="Card Back">
        </div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });

  // Ajustar el tamaño del tablero
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;

  // Mostrar el juego y ocultar el menú de dificultad
  difficultyMenu.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  // Iniciar el temporizador
  startTimer();
}

// Función para voltear una carta
function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  if (firstCard === secondCard) {
    resetBoard();
    return;
  }

  if (firstCard.dataset.name === secondCard.dataset.name) {
    correctSound.play();
    updateScore(10);
    resetBoard();
    checkForWin();
  } else {
    wrongSound.play();
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
}

// Función para reiniciar el tablero
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Función para verificar si el jugador ganó
function checkForWin() {
  const flippedCards = document.querySelectorAll(".flipped");
  const totalCards = document.querySelectorAll(".card").length;

  if (flippedCards.length === totalCards) {
    clearInterval(timer);
    winScoreDisplay.textContent = score;
    winScreen.classList.remove("hidden");
  }
}

// Función para mostrar una pregunta
function showQuestion() {
  if (questionActive) return;
  questionActive = true;

  let randomIndex = Math.floor(Math.random() * questions.length);
  let currentQuestion = questions[randomIndex];

  questionText.textContent = currentQuestion.question;
  questionContainer.classList.remove("hidden");
  answerInput.value = "";
  submitAnswer.disabled = false;

  let timeToAnswer = 10;
  questionTimerDisplay.textContent = timeToAnswer;

  submitAnswer.onclick = function () {
    clearInterval(questionTimer);
    submitAnswer.disabled = true;

    if (answerInput.value.toLowerCase() === currentQuestion.answer) {
      timeLeft += 30;
      timerDisplay.textContent = timeLeft;
      updateScore(20);
      showFeedback("¡Correcto! Ganas 30 segundos extra.", "green");
      correctSound.play();
    } else {
      showFeedback("Respuesta incorrecta.", "red");
      wrongSound.play();
    }

    questionContainer.classList.add("hidden");
    questionActive = false;
  };

  questionTimer = setInterval(() => {
    timeToAnswer--;
    questionTimerDisplay.textContent = timeToAnswer;

    if (timeToAnswer <= 0) {
      clearInterval(questionTimer);
      showFeedback("¡Se acabó el tiempo para responder!", "red");
      questionContainer.classList.add("hidden");
      submitAnswer.disabled = true;
      questionActive = false;
    }
  }, 1000);
}

// Función para actualizar la puntuación
function updateScore(points) {
  score = Math.max(0, score + points);
  scoreDisplay.textContent = score;
}

// Función para mostrar retroalimentación
function showFeedback(message, color) {
  feedback.textContent = message;
  feedback.style.color = color;
  feedback.classList.remove("hidden");
  setTimeout(() => feedback.classList.add("hidden"), 2000);
}

// Función para mostrar la pantalla de Game Over
function showGameOver() {
  clearInterval(timer);
  clearInterval(questionTimer);
  gameOverScreen.classList.remove("hidden");
  finalScoreDisplay.textContent = score;
}

// Función para reiniciar el juego
function restartGame() {
  timeLeft = 60;
  score = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  questionActive = false;

  clearInterval(timer);
  clearInterval(questionTimer);

  gameOverScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  difficultyMenu.classList.remove("hidden");
  gameContainer.classList.add("hidden");

  gameBoard.innerHTML = "";
  timerDisplay.textContent = timeLeft;
  scoreDisplay.textContent = score;
}

// Iniciar el cronómetro
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      showGameOver();
    } else {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
    }
  }, 1000);
}

// Eventos para los botones de dificultad
document.getElementById("easy").addEventListener("click", () => startGame("easy"));
document.getElementById("medium").addEventListener("click", () => startGame("medium"));
document.getElementById("hard").addEventListener("click", () => startGame("hard"));

// Mostrar preguntas cada 15 segundos
setInterval(showQuestion, 15000);

// Asignar el evento al botón de reinicio
restartButton.addEventListener("click", restartGame);
winRestartButton.addEventListener("click", restartGame);
