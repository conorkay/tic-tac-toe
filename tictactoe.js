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
    if (gameBoard.checkWinCondition()) {
      displayController.removeLoop();
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

  const checkWinCondition = () => {
    if (
      // horizontal rows
      (gameBoardArray[0] === gameBoardArray[1] &&
        gameBoardArray[1] === gameBoardArray[2] &&
        gameBoardArray[0] != undefined) ||
      (gameBoardArray[3] === gameBoardArray[4] &&
        gameBoardArray[4] === gameBoardArray[5] &&
        gameBoardArray[3] != undefined) ||
      (gameBoardArray[6] === gameBoardArray[7] &&
        gameBoardArray[7] === gameBoardArray[8] &&
        gameBoardArray[6] != undefined) ||
      // vertical columns
      (gameBoardArray[0] === gameBoardArray[3] &&
        gameBoardArray[3] === gameBoardArray[6] &&
        gameBoardArray[0] != undefined) ||
      (gameBoardArray[1] === gameBoardArray[4] &&
        gameBoardArray[4] === gameBoardArray[7] &&
        gameBoardArray[1] != undefined) ||
      (gameBoardArray[2] === gameBoardArray[5] &&
        gameBoardArray[5] === gameBoardArray[8] &&
        gameBoardArray[2] != undefined) ||
      // diagonals
      (gameBoardArray[0] === gameBoardArray[4] &&
        gameBoardArray[4] === gameBoardArray[8] &&
        gameBoardArray[0] != undefined) ||
      (gameBoardArray[2] === gameBoardArray[4] &&
        gameBoardArray[4] === gameBoardArray[6] &&
        gameBoardArray[2] != undefined)
    ) {
      game.changeGameStatus();
      game.processWin();
      console.log('Winning turn #' + game.getCurrentTurn());
      console.log('game over');
      console.log(game.isGameOver());
      displayController.removeLoop();
      return true;
    }
    return false;
  };

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
  var turnCount = 1;
  var currentTurn = 1;
  var winner = 0;

  const isGameOver = () => isOver;
  const changeGameStatus = () => (isOver = !isOver);
  const getTurnCount = () => turnCount;
  const incrementTurnCount = () => turnCount++;
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
    turnCount = 1;
    currentTurn = 1;
    gameBoard.resetGameArray();
    gameBoard.updateGameBoard();
    player1.resetScore();
    player2.resetScore();
    newGame = true;
    displayController.removeLoop();
  };

  const processTie = () => {
    game.changeGameStatus();
    console.log('its a tie');
    game.reset();
  };

  const processWin = () => {
    if (currentTurn === 1) {
      winner = 'x';
    } else {
      winner = 'o';
    }
    console.log('winner: ' + winner);
  };

  return {
    isGameOver,
    changeGameStatus,
    start,
    reset,
    getTurnCount,
    getCurrentTurn,
    changeTurn,
    incrementTurnCount,
    processTie,
    processWin,
  };
})();

const displayController = (function () {
  var elemArray = new Array();
  const tile0 = document.getElementById('0');
  const tile1 = document.getElementById('1');
  const tile2 = document.getElementById('2');
  const tile3 = document.getElementById('3');
  const tile4 = document.getElementById('4');
  const tile5 = document.getElementById('5');
  const tile6 = document.getElementById('6');
  const tile7 = document.getElementById('7');
  const tile8 = document.getElementById('8');
  elemArray.push(tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8);

  const initialize = () => {
    elemArray.forEach(addListener);
  };
  const addListener = (elem) => {
    elem.addEventListener('click', handleEvent);
  };

  function handleEvent(e) {
    var success;

    if (game.getCurrentTurn() === 1) {
      success = gameBoard.updateArray(elemArray.indexOf(e.currentTarget), 'x');
    } else {
      success = gameBoard.updateArray(elemArray.indexOf(e.currentTarget), 'o');
    }
    if (success) {
      console.log('success');
      gameBoard.updateGameBoard();
      game.changeTurn();
      game.incrementTurnCount();
      console.log(game.getTurnCount());
      if (game.getTurnCount() === 10) {
        game.processTie();
      }
    }
  }

  const removeLoop = () => {
    elemArray.forEach(removeListener);
  };

  const removeListener = (elem) => {
    elem.removeEventListener('click', handleEvent);
  };

  return { initialize, removeLoop };
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
