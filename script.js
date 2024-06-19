const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    gameOver = false;
    let board = initBoard();
    let currentPlayer = p1;
    let currentCell = null;
    function recursiveRead() {
        console.log(`It is ${currentPlayer.name}'s turn...`);
        rl.question(`Pick a position (x,y): `, (move) => {
            move = move.split(',').map(i => Number(i));
            currentCell = board.getCell(move[0], move[1]);
            board.placeToken(currentCell, currentPlayer);
            board.printBoard();
            if (currentPlayer) currentPlayer = currentPlayer === p1 ? p2 : p1;
            recursiveRead();
        })
    }
    recursiveRead();
})();
