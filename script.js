const difficultyMenu = document.getElementById("difficulty-menu");
const gameContainer = document.getElementById("game-container");
const gameBoard = document.getElementById("game-board");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

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

// Función para iniciar el juego según la dificultad
function startGame(difficulty) {
  let gridSize;

  switch (difficulty) {
    case "easy":
      gridSize = 2; // 2x4 para 8 cartas (4 pares)
      break;
    case "medium":
      gridSize = 4; // 4x4 para 16 cartas (8 pares)
      break;
    case "hard":
      gridSize = 6; // 6x6 para 36 cartas (18 pares)
      break;
  }

  const totalCards = gridSize * gridSize;
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

  if (firstCard.dataset.name === secondCard.dataset.name) {
    resetBoard();
    checkForWin();
  } else {
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
    alert("¡Has ganado!");
    restartGame();
  }
}

// Función para reiniciar el juego
function restartGame() {
  difficultyMenu.classList.remove("hidden");
  gameContainer.classList.add("hidden");
  gameBoard.innerHTML = "";
}

// Eventos para los botones de dificultad
document.getElementById("easy").addEventListener("click", () => startGame("easy"));
document.getElementById("medium").addEventListener("click", () => startGame("medium"));
document.getElementById("hard").addEventListener("click", () => startGame("hard"));