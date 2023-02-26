/* Players */
const playerFactory = (id, token) => {
  const playerID = id;
  const playerToken = token;
  return { playerID, playerToken };
};

const playerOne = playerFactory("1", "X");
const playerTwo = playerFactory("2", "O");

const playerInfo = document.querySelector(".player-info");
let gameState = "on";
let previousMove = undefined;
let nextMove = playerOne;
/* Gameboard module */
const gameboard = (() => {
  let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  const container = document.querySelector(".boardContainer");

  let createBoard = () => {
    board.forEach((element, index, arr) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.textContent = element;
      fieldDiv.setAttribute("class", "square");
      fieldDiv.addEventListener("click", () => {
        // not able to place a token if the field is not empty or the game is off
        if (arr[index] != "-" || gameState === "off") {
          return;
        }
        arr[index] = nextMove.playerToken;
        fillBoard();
        game.evaluate();
        if (nextMove === playerOne) {
          nextMove = playerTwo;
        } else {
          nextMove = playerOne;
        }
      });
      container.appendChild(fieldDiv);
    });
  };

  let fillBoard = () => {
    const square = document.querySelectorAll(".square");
    for (let i = 0; i < square.length; i++) {
      square[i].textContent = board[i];
    }
  };

  /* Restarting the game */
  const restartButton = document.querySelector(".restart");
  restartButton.addEventListener("click", () => {
    gameState = "on";
    nextMove = playerOne;
    board.forEach((element, index, arr) => {
      arr[index] = "-";
    });
    fillBoard();
    playerInfo.textContent =
      "Next move: player " +
      nextMove.playerID +
      " (" +
      nextMove.playerToken +
      ")";
    restartButton.setAttribute("id", "hidden");
  });

  function showRestartBtn() {
    restartButton.removeAttribute("id", "hidden");
  }

  return { board, createBoard, fillBoard, showRestartBtn };
})();

const game = (() => {
  function evaluate() {
    /* Board: 
    0 1 2
    3 4 5
    6 7 8 */

    if (
      // 0 1 2
      (gameboard.board[0] !== "-" &&
        gameboard.board[0] === gameboard.board[1] &&
        gameboard.board[0] === gameboard.board[2]) ||
      // 3 4 5
      (gameboard.board[3] !== "-" &&
        gameboard.board[3] === gameboard.board[4] &&
        gameboard.board[3] === gameboard.board[5]) ||
      // 6 7 8
      (gameboard.board[6] !== "-" &&
        gameboard.board[6] === gameboard.board[7] &&
        gameboard.board[7] === gameboard.board[8]) ||
      // 0 3 6
      (gameboard.board[0] !== "-" &&
        gameboard.board[0] === gameboard.board[3] &&
        gameboard.board[0] === gameboard.board[6]) ||
      // 1 4 7
      (gameboard.board[1] !== "-" &&
        gameboard.board[1] === gameboard.board[4] &&
        gameboard.board[1] === gameboard.board[7]) ||
      // 2 5 8
      (gameboard.board[2] !== "-" &&
        gameboard.board[2] === gameboard.board[5] &&
        gameboard.board[2] === gameboard.board[8]) ||
      // 0 4 8
      (gameboard.board[0] !== "-" &&
        gameboard.board[0] === gameboard.board[4] &&
        gameboard.board[0] === gameboard.board[8]) ||
      // 2 4 6
      (gameboard.board[2] !== "-" &&
        gameboard.board[2] === gameboard.board[4] &&
        gameboard.board[2] === gameboard.board[6])
    ) {
      console.log("win");
      playerInfo.textContent =
        "Congratulations! Player " +
        nextMove.playerID +
        " (" +
        nextMove.playerToken +
        ") won the game!";
      gameState = "off";
      nextMove = undefined;
      gameboard.showRestartBtn();
    } else if (!gameboard.board.includes("-")) {
      console.log("draw");
      playerInfo.textContent = "The game ends in a draw!";
      gameState = "off";
      nextMove = undefined;
      gameboard.showRestartBtn();
    }

    return { gameState };
  }
  return { evaluate };
})();

gameboard.createBoard();
gameboard.fillBoard();
