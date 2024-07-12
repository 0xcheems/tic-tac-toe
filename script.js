function createPlayer(token) {
  let name = "";
  let score = 0;

  const setName = (newName) => {
    name = newName;
  };

  const getName = () => name;

  const getScore = () => score;

  const incrScore = () => {
    score++;
  };

  const resetScore = () => {
    score = 0;
  };

  return { getName, setName, token, getScore, incrScore, resetScore };
}

function createBoard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push(null);
  }

  const fillCell = (cell, token) => {
    board[cell] = token;
  };

  const getState = () => {
    return board;
  };

  const resetState = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = null;
    }
  };

  const showBoard = () => {
    for (let i = 0; i < 9; i += 3) {
      console.log(board[i], board[i + 1], board[i + 2]);
    }
    console.log("\n");
  };

  return { fillCell, getState, resetState, showBoard };
}

const gameController = (() => {
  const board = createBoard();
  const p1 = createPlayer("x");
  const p2 = createPlayer("o");
  let currentPlayer;
  let roundCount = 1;

  const checkWin = (boardState) => {
    const winState = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (let i = 0; i < 8; i++) {
      const a = boardState[winState[i][0]];
      const b = boardState[winState[i][1]];
      const c = boardState[winState[i][2]];

      if (!a || !b || !c) continue;
      if (a === b && b === c) return true;
    }

    return false;
  };

  const checkGameOver = (boardState) => {
    if (!boardState.includes(null)) return true;
  };

  const checkMoveValidity = (boardState, position) => {
    if (!boardState[position]) return true;
  };

  const getCurrentPlayer = () => currentPlayer;

  const setCurrentPlayer = (player) => {
    currentPlayer = player;
  };

  const getRoundCount = () => roundCount;

  const incrRoundCount = () => {
    roundCount++;
  };

  const resetRoundCount = () => {
    roundCount = 1;
  };

  // TODO: remember to add something for the individual scores and the round count
  const resetGame = () => {
    currentPlayer = null;
    board.resetState();
    p1.setName(null);
    p2.setName(null);
  };

  const resetRound = () => {
    currentPlayer = currentPlayer === p1 ? p2 : p1;
    board.resetState();
  };

  const resetPlayerScores = () => {
    p1.resetScore();
    p2.resetScore();
  };

  return {
    checkWin,
    checkGameOver,
    checkMoveValidity,
    board,
    p1,
    p2,
    getCurrentPlayer,
    setCurrentPlayer,
    getRoundCount,
    incrRoundCount,
    resetRoundCount,
    resetGame,
    resetRound,
    resetPlayerScores,
  };
})();

// TODO: Add reset logic to go back to the main menu
// TODO: Add a message that pops up every round
// TODO: Stop user from starting if both name fields are not filled

(function displayController() {
  const gc = gameController;
  const mainMenu = document.querySelector(".welcome-overlay");
  const startButton = document.querySelector(".welcome-overlay .start-game");
  const p1Field = document.querySelector("input#p1");
  const p2Field = document.querySelector("input#p2");
  const boardUI = document.querySelector(".board-container");
  const resultDialog = document.querySelector(".result-dialog");
  const resultMsg = document.querySelector(".result-text");
  const quitButton = document.querySelector(".quit-button");
  const nextRoundButton = document.querySelector(".next-round-button");
  const restartRoundButton = document.querySelector(".restart-round-button");
  const quitGameButton = document.querySelector(".quit-game-button");
  const p1Score = document.querySelector(".p1-scoreboard span:nth-child(2)");
  const p2Score = document.querySelector(".p2-scoreboard span:nth-child(2)");
  const p1Name = document.querySelector(".p1-scoreboard span:first-child");
  const p2Name = document.querySelector(".p2-scoreboard span:first-child");
  const roundDisplay = document.querySelector(".round-count span:nth-child(2)");
  const boardUIArray = Array.from(
    document.querySelectorAll(".board-container > div"),
  );

  const startGame = () => {
    if (p1Field.value && p2Field.value) {
      gc.p1.setName(p1Field.value);
      gc.p2.setName(p2Field.value);
      gc.setCurrentPlayer(gc.p1);
      updateScoreboard();
      console.log("player 1:", gc.p1, "player 2:", gc.p2);
      mainMenu.style.display = "none";
    }
  };

  const updateScoreboard = () => {
    p1Name.textContent = gc.p1.getName();
    p1Score.textContent = gc.p1.getScore();
    p2Name.textContent = gc.p2.getName();
    p2Score.textContent = gc.p2.getScore();
    roundDisplay.textContent = gc.getRoundCount();
  };

  const resetBoardUI = () => {
    for (cell of boardUIArray) {
      cell.textContent = "";
    }
  };

  const resetPlayerFields = () => {
    p1Field.value = "";
    p2Field.value = "";
  };

  // create functions to show the main menu, remove the result overlay, reset the player names
  // create a function to keep scores and create a function to reset the scores

  const showMainMenu = () => {
    mainMenu.style.display = "flex";
  };

  const removeResult = () => {
    resultDialog.style.display = "none";
  };

  const startNextRound = () => {
    gc.resetRound();
    resetBoardUI();
    removeResult();
    updateScoreboard();
  };

  const restartRound = () => {
    gc.resetRound();
    resetBoardUI();
  };

  const quitGame = () => {
    gc.resetGame();
    gc.resetPlayerScores();
    gc.resetRoundCount();
    resetBoardUI();
    removeResult();
    resetPlayerFields();
    showMainMenu();
  };

  const showResult = (text) => {
    resultMsg.textContent = text;
    resultDialog.style.display = "flex";
  };

  const startGameOnEnterKeypress = (event) => {
    if (event.code.toLowerCase() === "enter") startGame();
  };

  const handleCellClick = (event, token) => {
    const cell = Number.parseInt(event.target.id);
    const isMoveValid =
      gc.checkMoveValidity(gc.board.getState(), cell) &&
      !event.target.textContent;

    if (
      isMoveValid &&
      !gc.checkWin(gc.board.getState()) &&
      !gc.checkGameOver(gc.board.getState())
    ) {
      gc.board.fillCell(cell, token);
      event.target.textContent = token;
    }

    if (gc.checkWin(gc.board.getState())) {
      showResult(`${gc.getCurrentPlayer().getName()} wins`);
      gc.getCurrentPlayer().incrScore();
      gc.incrRoundCount();
      console.log(gc.p1.getScore(), gc.p2.getScore());
    } else if (gc.checkGameOver(gc.board.getState())) {
      showResult("it's a tie");
      gc.incrRoundCount();
    } else if (isMoveValid) {
      gc.setCurrentPlayer(gc.getCurrentPlayer() === gc.p1 ? gc.p2 : gc.p1);
    }
  };

  startButton.addEventListener("click", startGame);
  quitButton.addEventListener("click", quitGame);
  nextRoundButton.addEventListener("click", startNextRound);
  restartRoundButton.addEventListener("click", restartRound);
  quitGameButton.addEventListener("click", quitGame);
  p1Field.addEventListener("keydown", startGameOnEnterKeypress);
  p2Field.addEventListener("keydown", startGameOnEnterKeypress);

  for (const cell of boardUIArray) {
    cell.addEventListener("click", (event) =>
      handleCellClick(event, gc.getCurrentPlayer().token),
    );
  }
})();
