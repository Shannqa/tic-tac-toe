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
        if (currentPlayer === playerOne) {
          arr[index] = "X";
          currentPlayer = playerTwo;
        } else {
          arr[index] = "O";
          currentPlayer = playerOne;
        }
        fieldDiv.textContent = arr[index];
        activePlayer.textContent =
          "player " +
          currentPlayer.playerID +
          " (" +
          currentPlayer.playerToken +
          ")";
        console.log(currentPlayer);
        console.log(board);
      });

      container.appendChild(fieldDiv);
    });
  };
  return { board, render, currentPlayer, currentToken };
})();

// const game = (() => {
//   //start of the game

//   // once the event happens once (player 1 puts a token on the field), change the current player to player 2, then render the board

//   return {  };
// })();

gameboard.render();
