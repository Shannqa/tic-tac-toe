/* Players */
const playerFactory = (playerID, playerToken, playerName) => {
  const ID = playerID;
  const token = playerToken;
  const name = playerName;
  return { ID, token, name };
};

const playerOne = playerFactory("1", "X", "Player 1");
const playerTwo = playerFactory("2", "O", "Player 2");
const playerThree = playerFactory("3", "O", "AI (normal)");
const playerFour = playerFactory("4", "O", "AI (hard)");

const playerInfo = document.querySelector(".player-info");
let gameState = "on";
let nextMove = playerOne;
let mode = "player-game";

const pcGame = document.querySelector("#pc-game");
const playerGame = document.querySelector("#player-game");
const pcHard = document.querySelector("#pc-hard");

pcGame.addEventListener("click", () => {
  mode = "pc-game";
});
playerGame.addEventListener("click", () => {
  mode = "player-game";
});

pcHard.addEventListener("click", () => {
  mode = "pc-hard";
});

/* Gameboard module */

const gameboard = (() => {
  let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  let currentPlayer = playerOne;

  /* Board: 
    0 1 2
    3 4 5
    6 7 8 */

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const squares = document.querySelectorAll(".square");

  // create an empty board
  function createBoard() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].textContent = "-";
      squares[i].addEventListener("click", clickField);
    }
  }

  // on clicking a field on the board
  function clickField(event) {
    if (board[event.target.id] === "-") {
      turn(event.target.id);
    }
  }

  // a single turn of the game
  function turn(squareID) {
    board[squareID] = currentPlayer.token;
    document.getElementById(`${squareID}`).textContent = currentPlayer.token;

    // check if the game's ended
    let gameWon = checkWin();

    if (gameWon) {
      return endGame();
    }
    // if it's a player vs player game, change the current player to the other one (PlayerOne - PlayerTwo)
    if (mode === "player-game") {
      if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
      } else {
        currentPlayer = playerOne;
      }
    }
    console.log(mode, squareID);
  }

  function checkWin() {
    let gameWon = null;
    let currPlayerMoves = board.reduce(
      (array, element, inc) =>
        element === currentPlayer.token ? array.concat(inc) : array,
      []
    );
    for (let [index, win] of winCombos.entries()) {
      if (win.every((elem) => currPlayerMoves.indexOf(elem) > -1)) {
        gameWon = "lala";
        break;
      }
    }
    return gameWon;
  }

  function endGame() {
    console.log("the game ends! " + currentPlayer.name + " wins!");

    for (let i = 0; i < squares.length; i++) {
      squares[i].removeEventListener("click", clickField);
    }
    restartBtn.removeAttribute("id", "hidden");
  }

  const restartBtn = document.querySelector(".restart");
  restartBtn.addEventListener("click", restartGame);

  /* restarting the game */
  function restartGame() {
    gameState = "on";
    currentPlayer = playerOne;
    board.forEach((elem, index, arr) => {
      arr[index] = "-";
    });
    restartBtn.setAttribute("id", "hidden");
    createBoard();
  }

  return { board, createBoard, checkWin };
})();

// const game = (() => {
//   function evaluate() {
//     /* Board:
//     0 1 2
//     3 4 5
//     6 7 8 */

//     if (
//       // 0 1 2
//       (gameboard.board[0] !== "-" &&
//         gameboard.board[0] === gameboard.board[1] &&
//         gameboard.board[0] === gameboard.board[2]) ||
//       // 3 4 5
//       (gameboard.board[3] !== "-" &&
//         gameboard.board[3] === gameboard.board[4] &&
//         gameboard.board[3] === gameboard.board[5]) ||
//       // 6 7 8
//       (gameboard.board[6] !== "-" &&
//         gameboard.board[6] === gameboard.board[7] &&
//         gameboard.board[7] === gameboard.board[8]) ||
//       // 0 3 6
//       (gameboard.board[0] !== "-" &&
//         gameboard.board[0] === gameboard.board[3] &&
//         gameboard.board[0] === gameboard.board[6]) ||
//       // 1 4 7
//       (gameboard.board[1] !== "-" &&
//         gameboard.board[1] === gameboard.board[4] &&
//         gameboard.board[1] === gameboard.board[7]) ||
//       // 2 5 8
//       (gameboard.board[2] !== "-" &&
//         gameboard.board[2] === gameboard.board[5] &&
//         gameboard.board[2] === gameboard.board[8]) ||
//       // 0 4 8
//       (gameboard.board[0] !== "-" &&
//         gameboard.board[0] === gameboard.board[4] &&
//         gameboard.board[0] === gameboard.board[8]) ||
//       // 2 4 6
//       (gameboard.board[2] !== "-" &&
//         gameboard.board[2] === gameboard.board[4] &&
//         gameboard.board[2] === gameboard.board[6])
//     ) {
//       console.log("win");
//       playerInfo.textContent =
//         nextMove.playerName + " (" + nextMove.playerToken + ") won the game!";
//       gameState = "off";
//       nextMove = undefined;
//       gameboard.showRestartBtn();
//     } else if (!gameboard.board.includes("-")) {
//       console.log("draw");
//       playerInfo.textContent = "The game ends in a draw!";
//       gameState = "off";
//       nextMove = undefined;
//       gameboard.showRestartBtn();
//     }

//     return { gameState };
//   }
//   return { evaluate };
// })();

gameboard.createBoard();
