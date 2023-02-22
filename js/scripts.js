let gameState = "on";
/* Players */
const playerFactory = (id, token) => {
  const playerID = id;
  const playerToken = token;
  return { playerID, playerToken };
};

const playerOne = playerFactory("1", "X");
const playerTwo = playerFactory("2", "O");
const activePlayer = document.querySelector(".active-player");

/* Gameboard module */
const gameboard = (() => {
  const board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  let currentPlayer = playerOne;
  let currentToken = currentPlayer.playerToken;

  const render = () => {
    const container = document.querySelector(".boardContainer");
    board.forEach((field, index, arr) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.textContent = field;

      fieldDiv.addEventListener("click", () => {
        //unable to place a token if the field is not empty
        if (arr[index] != "-") {
          return;
        }
        if (gameState === "off") {
          return;
        }
        if (currentPlayer === playerOne) {
          arr[index] = "X";
          currentPlayer = playerTwo;
        } else {
          arr[index] = "O";
          currentPlayer = playerOne;
        }
        fieldDiv.textContent = arr[index];

        activePlayer.textContent =
          "Next move: player " +
          currentPlayer.playerID +
          " (" +
          currentPlayer.playerToken +
          ")";
        game.evaluate();
        console.log(currentPlayer);
        console.log(board);
      });

      container.appendChild(fieldDiv);
    });
  };

  return { board, render, currentPlayer, currentToken, activePlayer };
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
      gameboard.activePlayer.textContent =
        "Congratulations! Player " +
        gameboard.currentPlayer.playerID +
        " (" +
        gameboard.currentPlayer.playerToken +
        ") won the game!";
      gameState = "off";
    }
    return { gameState };
  }
  return { evaluate };
})();

gameboard.render();
