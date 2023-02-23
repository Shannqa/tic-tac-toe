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
  const board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

  const render = () => {
    const container = document.querySelector(".boardContainer");
    board.forEach((field, index, arr) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.textContent = field;

      fieldDiv.addEventListener("click", () => {
        // unable to place a token if the field is not empty
        if (arr[index] != "-") {
          return;
        }
        // unable to place a token if the game is finished
        if (gameState === "off") {
          return;
        }
        // gameplay
        if (nextMove === playerOne) {
          arr[index] = "X";
          previousMove = playerOne;
          nextMove = playerTwo;
        } else if (nextMove === playerTwo) {
          arr[index] = "O";
          previousMove = playerTwo;
          nextMove = playerOne;
        }
        fieldDiv.textContent = arr[index];

        playerInfo.textContent =
          "Next move: player " +
          nextMove.playerID +
          " (" +
          nextMove.playerToken +
          ")";
        game.evaluate();
        console.log(nextMove);
        console.log(board);
      });

      container.appendChild(fieldDiv);
    });
  };

  return { board, render };
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
        previousMove.playerID +
        " (" +
        previousMove.playerToken +
        ") won the game!";
      gameState = "off";
      previousMove = undefined;
      nextMove = undefined;
    }
    return { gameState };
  }
  return { evaluate };
})();

gameboard.render();
