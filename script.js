function initBoard() {
    let board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(createCell());
        }
    }

    const placeToken = (cell, player) => {
        if (cell.getValue() === null) cell.fill(player);
        else console.log('this spot is taken');
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

(function gameController() {
    const p1 = createPlayer("player 1", "x");
    const p2 = createPlayer("player 2", "o");
    let gameOver = false;
    let board = initBoard();
    let currentPlayer = p1;
    let currentCell = null;

    function checkWin(board) {
        console.log(board.getCell(0, 0) !== null && ((board.getCell(0, 0).getValue() === board.getCell(0, 1).getValue()) && board.getCell(0, 0).getValue() === board.getCell(0, 2).getValue()));
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

    // TODO: Stop player from playing in already filled spot
    // TODO: Input Validation
    while (!gameOver) {
        alert(`It is ${currentPlayer.name}'s turn...`);
        move = prompt("pick a cell to place your marker(x,y): ");
        move = move.split(',').map(i => Number(i));
        currentCell = board.getCell(move[0], move[1]);
        board.placeToken(currentCell, currentPlayer);
        if (checkWin(board)) {
            console.log(`${currentPlayer.name} won the game!`);
        } else if (gameOver === true) {
            console.log("it's a damn draw lol!");
        }
        board.printBoard();
        if (currentPlayer) currentPlayer = currentPlayer === p1 ? p2 : p1;
    }

})();
