function createPlayer(name, token) {
  return { name, token };
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

(function gameController() {
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

  const board = createBoard();
  const p1 = createPlayer("p1", "x");
  const p2 = createPlayer("p2", "o");
  let currentPlayer = p1;
  let cell;

  while (true) {
    cell = Math.floor(Math.random() * 9);

    if (checkMoveValidity(board.getState(), cell)) {
      board.fillCell(cell, currentPlayer.token);
    } else continue;

    board.showBoard();
    if (checkWin(board.getState())) {
      console.log(`${currentPlayer.name} wins`);
      break;
    }

    if (checkGameOver(board.getState())) {
      console.log("it's a tie");
      break;
    }
    currentPlayer = currentPlayer === p1 ? p2 : p1;
  }
})();
