function createPlayer(token) {
  let name = "";

  const setName = (newName) => {
    name = newName;
  };

  const getName = () => name;

  return { getName, setName, token };
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

    for (let i = 0; i < 7; i++) {
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
  const boardUIArray = Array.from(
    document.querySelectorAll(".board-container > div"),
  );

  const startGame = () => {
    if (p1Field.value && p2Field.value) {
      gc.p1.setName(p1Field.value);
      gc.p2.setName(p2Field.value);
      gc.setCurrentPlayer(gc.p1);
      console.log("player 1:", gc.p1, "player 2:", gc.p2);
      mainMenu.style.display = "none";
    }
  };

  const resetBoardUI = () => {
    for (cell in boardUIArray) {
      cell.textContent = "";
    }
  };

  const showWinner = () => {
    // show a ui overlay for the winner
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
      console.log(`${gc.getCurrentPlayer().getName()} wins`);
    } else if (gc.checkGameOver(gc.board.getState())) {
      console.log("it's a tie");
    } else if (isMoveValid) {
      gc.setCurrentPlayer(gc.getCurrentPlayer() === gc.p1 ? gc.p2 : gc.p1);
    }
  };

  startButton.addEventListener("click", startGame);

  for (const cell of boardUIArray) {
    cell.addEventListener("click", (event) =>
      handleCellClick(event, gc.getCurrentPlayer().token),
    );
  }
})();
