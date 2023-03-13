/* Players */
const playerFactory = (playerID, playerToken, playerName) => {
  const ID = playerID;
  const token = playerToken;
  const name = playerName;
  return { ID, token, name };
};
//// works when array is 9
const playerOne = playerFactory("1", "X", "Player 1");
const playerTwo = playerFactory("2", "O", "Player 2");
const playerAI = playerFactory("3", "O", "AI");

const playerInfo = document.querySelector(".player-info");
let gameState = "on";
let nextMove = playerOne;
let mode = "player-game";

const playerGame = document.querySelector("#player-game");
const aiEasy = document.querySelector("#ai-easy");
const aiMedium = document.querySelector("#ai-medium");
const aiHard = document.querySelector("#ai-hard");
const aiUnbeatable = document.querySelector("#ai-unbeatable");

playerGame.addEventListener("click", () => {
  mode = "player-game";
  gameboard.restartGame();
});

aiEasy.addEventListener("click", () => {
  mode = "ai-easy";
  gameboard.restartGame();
});

aiMedium.addEventListener("click", () => {
  mode = "ai-medium";
  gameboard.restartGame();
});

aiHard.addEventListener("click", () => {
  mode = "ai-hard";
  gameboard.restartGame();
});


aiUnbeatable.addEventListener("click", () => {
  mode = "ai-unbeatable";
  gameboard.restartGame();
});
/* Gameboard module */

const gameboard = (() => {
  let board = Array.from(Array(9).keys());
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
    if (mode === "player-game") {
      playerInfo.textContent =
        "Next move: " + currentPlayer.name + " (" + currentPlayer.token + ")";
    } else {
      playerInfo.textContent = "Make your move!  Player: X, AI: O";
    }
  }

  let emptySquares = () => {
    return board.filter((s) => typeof s == "number");
  };
  let randomS = () => {
    let empty = emptySquares();
    let random = Math.floor(Math.random() * empty.length);
    return empty[random];
  };

  // on clicking a field on the board
  function clickField(event) {
    if (typeof board[event.target.id] == "number") {
      turn(event.target.id, currentPlayer);
      if (mode === "ai-easy" && !checkWin(board, playerOne) && !checkTie()) {
        turn(randomS(), playerAI);
      }
      if (mode === "ai-medium" && !checkWin(board, playerOne) && !checkTie()) {
        let moveChance = Math.floor(Math.random() * 100);
        if (moveChance < 30) {
          turn(randomS(), playerAI);
        } else {
          turn(bestSpot(), playerAI);
        }
        console.log(moveChance);
      }
      
      if (mode === "ai-hard" && !checkWin(board, playerOne) && !checkTie()) {
        let moveChance = Math.floor(Math.random() * 100);
        if (moveChance < 10) {
          turn(randomS(), playerAI);
        } else {
          turn(bestSpot(), playerAI);
        }
        console.log(moveChance);
      }
      if (mode === "ai-unbeatable" && !checkWin(board, playerOne) && !checkTie()) {
        turn(bestSpot(), playerAI);
      }
    }
  }

  // a single turn of the game
  function turn(squareID, player) {
    board[squareID] = player.token;
    document.getElementById(squareID).textContent = player.token;

    // check if the game's ended
    let gameWon = checkWin(board, player);

    if (gameWon) {
      return endGame(gameWon);
    }
    // if it's a player vs player game, change the current player to the other one (PlayerOne - PlayerTwo)
    if (mode === "player-game") {
      if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
      } else {
        currentPlayer = playerOne;
      }
      playerInfo.textContent =
        "Next move: " + currentPlayer.name + " (" + currentPlayer.token + ")";
    }

    // console.log(mode, squareID);
  }

  function checkTie() {
    if (emptySquares().length == 0) {
      for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener("click", clickField);
      }
      playerInfo.textContent = "Tie!";
      return true;
    }
    return false;
  }

  function checkWin(gameBoard, player) {
    let playerMoves = gameBoard.reduce(
      (array, element, inc) =>
        element === player.token ? array.concat(inc) : array,
      []
    );
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
      if (win.every((elem) => playerMoves.indexOf(elem) > -1)) {
        gameWon = { index: index, player: player };
        break;
      }
    }
    return gameWon;
  }

  function endGame(gameWon) {
    if (checkTie === true) {
      playerInfo.textContent = "The game ends in a tie!";
    } else {
      playerInfo.textContent =
        "The game ends! " +
        gameWon.player.name +
        " (" +
        gameWon.player.token +
        ") wins!";
    }

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
    // board.forEach((elem, index, arr) => {
    //   arr[index] = "-";
    // });
    board = Array.from(Array(9).keys());
    restartBtn.setAttribute("id", "hidden");
    createBoard();
  }

  function bestSpot() {
    return minimax(board, playerAI).index;
  }

  function minimax(newBoard, player) {
    var availableSpots = emptySquares();
    if (checkWin(newBoard, playerOne)) {
      return { score: -10 };
    } else if (checkWin(newBoard, playerAI)) {
      return { score: 10 };
    } else if (availableSpots.length === 0) {
      return { score: 0 };
    }

    var moves = [];
    for (var i = 0; i < availableSpots.length; i++) {
      var move = {};
      move.index = newBoard[availableSpots[i]];
      newBoard[availableSpots[i]] = player.token;

      if (player == playerAI) {
        var result = minimax(newBoard, playerOne);
        move.score = result.score;
      } else {
        var result = minimax(newBoard, playerAI);
        move.score = result.score;
      }

      newBoard[availableSpots[i]] = move.index;
      moves.push(move);
    }
    var bestMove;
    if (player === playerAI) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  return {
    board,
    createBoard,
    checkWin,
    restartGame,
    checkTie,
    emptySquares,
    randomS,
  };
})();

gameboard.createBoard();
