function initBoard() {
    let board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(createCell());
        }
    }

    const placeToken = (cell, player) => {
        if (cell.getValue() === null) {
            cell.fill(player);
            return true;
        }
        else return false;
    }
    const getBoard = () => board;
    const getCell = (x, y) => board[x][y];
    const printBoard = () => {
        console.log(
            board.map((row) => row.map((cell) => cell.getValue()))
        );
    }

    return { placeToken, getBoard, getCell, printBoard };
}

function createCell() {
    let value = null

    const fill = (player) => {
        value = player.token
    }

    const getValue = () => value;

    return { getValue, fill };
}

function createPlayer(name, token) {
    return { name, token }
}

function renderDOM() {
    let isMoveValid = false;
    const domBoardArr = [];
    const domRows = document.querySelectorAll('.row');
    for (let i = 0; i < 3; i++) {
        const domCells = domRows[i].querySelectorAll('.row div');
        const rowArr = []

        for (let j = 0; j < 3; j++) {
            rowArr.push(domCells[j]);
        }

        domBoardArr.push(rowArr);
    }

    const setMsg = (text) => {
        let msgBox = document.querySelector('.message');
        msgBox.textContent = text;
    }

    const fillCell = (cell, player) => {
        if (!cell.textContent) {
            isMoveValid = true;
            cell.textContent = player.token;
        } else isMoveValid = false;
    }

    const findCell = (domCell) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (domBoardArr[i][j] === domCell) return [i, j];
            }
        }
    }

    const getMoveValidity = () => isMoveValid;

    return { setMsg, fillCell, getMoveValidity, findCell };
}

(function gameController() {
    const p1 = createPlayer("player 1", "x");
    const p2 = createPlayer("player 2", "o");
    let gameOver = false;
    let board = initBoard();
    let dom = renderDOM();
    let currentPlayer = p1;
    dom.setMsg(`It is ${currentPlayer.name}'s turn...`);

    const checkWin = (board) => {
        gameOver = true;
        for (let i = 0; i < 3; i++) {
            if (board.getCell(0, 0).getValue() !== null) {
                if ((board.getCell(0, 0).getValue() === board.getCell(1, 1).getValue())
                    && (board.getCell(0, 0).getValue() === board.getCell(2, 2).getValue())) {
                    return true;
                }
            }

            if (board.getCell(2, 0).getValue() !== null) {
                if ((board.getCell(2, 0).getValue() === board.getCell(1, 1).getValue())
                    && (board.getCell(2, 0).getValue() === board.getCell(0, 2).getValue())) {
                    return true;
                }
            }

            if (board.getCell(i, 0).getValue() !== null) {
                if ((board.getCell(i, 0).getValue() === board.getCell(i, 1).getValue())
                    && (board.getCell(i, 0).getValue() === board.getCell(i, 2).getValue())) {
                    return true;
                }
            }

            if (board.getCell(0, i).getValue() !== null) {
                if ((board.getCell(0, i).getValue() === board.getCell(1, i).getValue())
                    && (board.getCell(0, i).getValue() === board.getCell(2, i).getValue())) {
                    return true;
                }
            }

            for (let j = 0; j < 3; j++) {
                if (board.getCell(i, j).getValue() === null) {
                    gameOver = false;
                }
            }
        }
        return false;
    }

    const domCells = document.querySelectorAll('.board-container .row div');
    domCells.forEach(cell => cell.addEventListener('click', () => {

        if (!checkWin(board) && !gameOver) {
            dom.fillCell(cell, currentPlayer, board);
            let cellPos = dom.findCell(cell);
            board.placeToken(board.getCell(cellPos[0], cellPos[1]), currentPlayer);
            if (dom.getMoveValidity()) {
                if (checkWin(board)) {
                    dom.setMsg(`${currentPlayer.name} won the game!`);
                } else if (gameOver) {
                    dom.setMsg("it's a damn draw lol!");
                } else {
                    if (currentPlayer) currentPlayer = currentPlayer === p1 ? p2 : p1;
                    dom.setMsg(`It is ${currentPlayer.name}'s turn...`);
                }

            } else dom.setMsg(`you can't play there...\nit is ${currentPlayer.name}'s turn`);
        }
        board.printBoard();
    }));
})();
