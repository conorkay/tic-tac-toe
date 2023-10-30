const gameBoard = (function () {
  var gameBoardArray = new Array(9);

  const updateGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      let elementID = 'tile' + (i + 1);
      let element = document.getElementById(elementID);
      element.innerText = gameBoardArray[i];
    }
  };

  const resetGameBoard = () => (gameBoardArray = [, , , , , , , ,]);
  const getArray = () => gameBoardArray;
  const updateArray = (index, symbol) => (gameBoardArray[index] = symbol);

  return { getArray, resetGameBoard, updateGameBoard, updateArray };
})();

const game = (function () {
  var isOver = false;

  const isGameOver = () => isOver;
  const changeGameStatus = () => (isOver = !isOver);

  const player1 = createPlayer(1);
  const player2 = createPlayer(2);
  gameBoard;

  return { isGameOver, changeGameStatus };
})();

const displayController = (function () {})();

function createPlayer(id) {
  let playerID = id;
  let score = 0;
  const win = () => ++score;
  const getScore = () => score;
  const resetScore = () => (score = 0);
  const getId = () => playerID;

  return { getId, win, getScore, resetScore };
}
