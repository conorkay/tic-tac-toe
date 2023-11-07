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
      console.log('Winning turn #' + game.getCurrentPlayerTurn());
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
  var currentPlayerTurn = 1;
  var winner = 0;
  var player1;
  var player2;

  function createPlayer(id) {
    let playerName = id;
    let score = 0;
    const win = () => ++score;
    const getScore = () => score;
    const resetScore = () => (score = 0);
    const getName = () => playerName;

    return { getName, win, getScore, resetScore };
  }

  const isGameOver = () => isOver;
  const changeGameStatus = () => (isOver = !isOver);
  const getTurnCount = () => turnCount;
  const incrementTurnCount = () => turnCount++;
  const getCurrentPlayerTurn = () => currentPlayerTurn;
  const changeTurn = () => {
    if (currentPlayerTurn === 1) {
      currentPlayerTurn = 2;
    } else if (currentPlayerTurn === 2) {
      currentPlayerTurn = 1;
    }
  };
  const getPlayer1Score = () => player1.getScore();
  const getPlayer2Score = () => player2.getScore();
  const getPlayer1Name = () => player1.getName();
  const getPlayer2Name = () => player2.getName();

  const createPlayers = (name1, name2) => {
    player1 = createPlayer(name1);
    player2 = createPlayer(name2);
    console.log(player1.getName());
    console.log(player2.getName());
  };

  const start = () => {
    while (!isOver) {}
  };

  const reset = () => {
    isOver = false;
    turnCount = 1;
    currentPlayerTurn = 1;
    gameBoard.resetGameArray();
    gameBoard.updateGameBoard();
    player1.resetScore();
    player2.resetScore();
    displayController.setNewGame(true);
    displayController.removeLoop();
  };

  const processTie = () => {
    game.changeGameStatus();
    console.log('its a tie');
  };

  const processWin = () => {
    if (currentPlayerTurn === 1) {
      winner = 'x';
    } else {
      winner = 'o';
    }
    console.log('winner: ' + winner);
  };

  return {
    createPlayers,
    getPlayer1Name,
    getPlayer1Score,
    getPlayer2Name,
    getPlayer2Score,
    isGameOver,
    changeGameStatus,
    start,
    reset,
    getTurnCount,
    getCurrentPlayerTurn,
    changeTurn,
    incrementTurnCount,
    processTie,
    processWin,
  };
})();

const displayController = (function () {
  const newGameDialog = document.getElementById('newGameDialog');
  const newGameForm = document.getElementById('newGameForm');
  const player1Card = document.getElementById('player1');
  const player2Card = document.getElementById('player2');
  var newGame = true;

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

  newGameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    game.createPlayers(
      e.currentTarget.player1Name.value,
      e.currentTarget.player2Name.value
    );

    setPlayerCards(
      e.currentTarget.player1Name.value,
      e.currentTarget.player2Name.value
    );

    closeTheDialog(newGameDialog);
  });

  function closeTheDialog(dialog) {
    dialog.close();
  }
  function openCheck(dialog) {
    if (dialog.open) {
      console.log('Dialog open');
    } else {
      console.log('Dialog closed');
    }
  }

  const setPlayerCards = (name1, name2) => {
    player1Card.innerText = name1;
    player2Card.innerText = name2;
  };

  const setNewGame = (bool) => {
    newGame = bool;
    console.log(newGame);
  };

  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', (event) => {
    game.reset();
  });

  const startButton = document.getElementById('start');
  startButton.addEventListener('click', (event) => {
    if (newGame) {
      displayController.initialize();
      newGame = false;
      displayDialog();
    }
  });

  const initialize = () => {
    elemArray.forEach(addListener);
  };
  const addListener = (elem) => {
    elem.addEventListener('click', handleEvent);
  };

  function handleEvent(e) {
    var success;

    if (game.getCurrentPlayerTurn() === 1) {
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

  const displayDialog = () => {
    newGameDialog.showModal();
  };

  return { initialize, removeLoop, setNewGame };
})();
