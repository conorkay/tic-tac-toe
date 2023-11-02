const gameBoard = (function () {
  var gameBoardArray = new Array(9);

  /*
  gameBoardArray[0] = 'o';
  gameBoardArray[1] = 'o';
  gameBoardArray[2] = 'o';
  gameBoardArray[3] = 'x';
  gameBoardArray[4] = 'o';
  gameBoardArray[5] = 'x';
  gameBoardArray[6] = 'x';
  gameBoardArray[7] = 'x';
  gameBoardArray[8] = 'x';
*/
  const updateGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      let element = document.getElementById(i);
      if (gameBoardArray[i] === undefined) {
        element.innerText = '';
      } else {
        element.innerText = gameBoardArray[i];
      }
    }
  };

  const resetGameArray = () => (gameBoardArray = [, , , , , , , ,]);
  const getArray = () => gameBoardArray;
  const updateArray = (index, symbol) => {
    if (gameBoardArray[index] === undefined) {
      gameBoardArray[index] = symbol;
      return true;
    } else {
      return false;
    }
  };

  const checkWinCondition = () => {};

  return {
    getArray,
    resetGameArray,
    updateGameBoard,
    updateArray,
    checkWinCondition,
  };
})();

const game = (function () {
  var isOver = false;
  var turnCount = 0;
  var currentTurn = 1;

  const isGameOver = () => isOver;
  const changeGameStatus = () => (isOver = !isOver);
  const getTurnCount = () => turnCount;
  const incrementTurn = () => turnCount++;
  const getCurrentTurn = () => currentTurn;
  const changeTurn = () => {
    if (currentTurn === 1) {
      currentTurn = 2;
    } else if (currentTurn === 2) {
      currentTurn = 1;
    }
  };

  const player1 = createPlayer(1);
  const player2 = createPlayer(2);

  const start = () => {
    while (!isOver) {}
  };
  const reset = () => {
    isOver = false;
    turnCount = 0;
    currentTurn = 1;
    gameBoard.resetGameArray();
    gameBoard.updateGameBoard();
    player1.resetScore();
    player2.resetScore();
    //newGame = true;
  };

  return {
    isGameOver,
    changeGameStatus,
    start,
    reset,
    getTurnCount,
    getCurrentTurn,
    changeTurn,
    incrementTurn,
  };
})();

const displayController = (function () {
  var elemArray = new Array();

  const initialize = () => {
    const tile0 = document.getElementById('0');
    const tile1 = document.getElementById('1');
    const tile2 = document.getElementById('2');
    const tile3 = document.getElementById('3');
    const tile4 = document.getElementById('4');
    const tile5 = document.getElementById('5');
    const tile6 = document.getElementById('6');
    const tile7 = document.getElementById('7');
    const tile8 = document.getElementById('8');
    elemArray.push(
      tile0,
      tile1,
      tile2,
      tile3,
      tile4,
      tile5,
      tile6,
      tile7,
      tile8
    );
    elemArray.forEach(addListener);
  };
  const addListener = (elem) => {
    elem.addEventListener('click', (event) => {
      var success;
      if (game.getCurrentTurn() === 1) {
        success = gameBoard.updateArray(elemArray.indexOf(elem), 'x');
      } else {
        success = gameBoard.updateArray(elemArray.indexOf(elem), 'o');
      }
      if (success) {
        console.log('success');
        gameBoard.updateGameBoard();
        game.changeTurn();
        game.incrementTurn();
      }
    });
  };

  return { initialize };
})();

function createPlayer(id) {
  let playerID = id;
  let score = 0;
  const win = () => ++score;
  const getScore = () => score;
  const resetScore = () => (score = 0);
  const getId = () => playerID;

  return { getId, win, getScore, resetScore };
}

var newGame = true;

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', (event) => {
  game.reset();
});

const startButton = document.getElementById('start');
startButton.addEventListener('click', (event) => {
  if (newGame) {
    displayController.initialize();
    newGame = false;
  }
});
