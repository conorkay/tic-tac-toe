const gameBoard = (function () {
  var gameBoardArray = new Array(9);

  const resetGameBoard = () => (gameBoardArray = [, , , , , , , ,]);

  return { gameBoardArray, resetGameBoard };
})();

const game = (function () {
  var isOver = false;

  const isGameOver = () => isOver;
  const changeGameStatus = () => (isOver = !isOver);

  return { isGameOver, changeGameStatus };
})();

function createPlayer(name) {
  let playerName = name;
  let score = 0;
  const win = () => ++score;
  const getScore = () => score;
  const resetScore = () => (score = 0);

  return { playerName, win, getScore, resetScore };
}
