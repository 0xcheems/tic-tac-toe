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

(function gameController() {
    const p1 = createPlayer("player 1", "x");
    const p2 = createPlayer("player 2", "o");
    let gameOver = false;
    let board = initBoard();
    let currentPlayer = p1;
    let currentCell = null;

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

    const validateInput = (input) => {
        input = input.split(',').map(i => Number(i));
        if (input.length !== 2) return false;
        for (let i = 0; i < input.length; i++) {
            if (typeof input[i] !== 'number') return false;
            else if (input[i] > 2 || input[i] < 0) return false;
        }
        return true;
    }

    // TODO: Stop player from playing in already filled spot DONE
    // TODO: Input Validation
    while (!gameOver) { // game loop
        alert(`It is ${currentPlayer.name}'s turn...`);
        move = prompt("pick a cell to place your marker(x,y): ");

        if (!validateInput(move)) {
            alert("invalid input, enter a pair of numbers \n(x,y : 0 <= x/y <= 2): ");
            continue;
        }

        move = move.split(',').map(i => Number(i));
        currentCell = board.getCell(move[0], move[1]);
        let placement = board.placeToken(currentCell, currentPlayer);

        if (!placement) {
            alert("you can't play there pal...");
            continue;
        }

        if (checkWin(board)) {
            console.log(`${currentPlayer.name} won the game!`);
        } else if (gameOver === true) {
            console.log("it's a damn draw lol!");
        }
        board.printBoard();
        if (currentPlayer) currentPlayer = currentPlayer === p1 ? p2 : p1;
    }

})();
