/* Players */
const playerFactory = (id) => {
  const playerID = id;
  return { playerID };
};

const playerOne = playerFactory("1");
const playerTwo = playerFactory("2");

/* Gameboard module */
const gameboard = (() => {
  const board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  const render = () => {
    const container = document.querySelector(".boardContainer");
    board.forEach((field, index, arr) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.textContent = field;
      fieldDiv.addEventListener("click", () => {
        fieldDiv.textContent = "X";
        arr[index] = "X";

        console.log(board);
      });

      container.appendChild(fieldDiv);
    });
  };
  return { board, render };
})();

gameboard.render();
