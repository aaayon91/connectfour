/*----- constants -----*/

const lookup = {
    '1': 'RED',
    '-1': 'YELLOW',
    null: 'WHITE'
};

/*----- app's state (variables) -----*/

let board, winner, turn;

/*----- cached element references -----*/

const tableEl = document.querySelector('table');
const headerEl = document.querySelector('h2');
const squares = document.querySelectorAll('td div'); 
const buttonEl = document.querySelector('button');

/*----- event listeners -----*/

buttonEl.addEventListener('click', init);

/*----- functions -----*/

init();

function init() {
    board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ];
    tableEl.addEventListener('click', handleTurn);
    turn = 1;
    winner = null;
    render();
}

function render() {
    const board1d = board.flat();
    headerEl.innerText = lookup[turn] + "'S TURN";
    board1d.forEach(function(tile,idx) {
        squares[idx].style.background = lookup[tile];
    })
    if(winner === 'TIE') {
        headerEl.innerText = "IT'S A TIE!";
    }else if(winner) {
        headerEl.innerText = lookup[winner] + " HAS WON THE GAME!";
    }
}

function checkWin(rowIdx, colIdx) {
    const downPieces = checkDown(rowIdx, colIdx);
    const rightPieces = checkRight(rowIdx, colIdx);
    const leftPieces = checkLeft(rowIdx, colIdx);
    const upRightPieces = checkUpRight(rowIdx, colIdx);
    const downLeftPieces = checkDownLeft(rowIdx, colIdx);
    const upLeftPieces = checkUpLeft(rowIdx, colIdx);
    const downRightPieces = checkDownRight(rowIdx, colIdx);
    const board1d = board.flat();
    
    if (downPieces === 3) {
        winner = turn;  
        tableEl.removeEventListener('click', handleTurn);
    } else if (rightPieces + leftPieces >= 3){
        winner = turn;  
        tableEl.removeEventListener('click', handleTurn);
    } else if (upRightPieces + downLeftPieces >= 3) {
        winner = turn;  
        tableEl.removeEventListener('click', handleTurn);
    } else if ((upLeftPieces + downRightPieces) >= 3) {
        winner = turn;  
        tableEl.removeEventListener('click', handleTurn);
    } else if(!winner && !board1d.includes(null)) {
        winner = 'TIE';
    } 
}

function handleTurn(evt) {
    let rowIdx = parseInt(evt.target.id.substr(1, 1))
    let colIdx = parseInt(evt.target.id.substr(3, 1))

    for (let i = 5; i >= 0; i-- ) {
        rowIdx = i;
        if (board[rowIdx][colIdx] === null) {
            board[rowIdx][colIdx] = turn;
            checkWin(rowIdx, colIdx);
            changeTurn();
            render();
            break;
        }
    }
}

function changeTurn() {
    turn *= -1;
}

function checkDown(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx + i] && board[rowIdx + i][colIdx] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break;
        }
    }
    return piecesInRow;
}

function checkRight(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx][colIdx + i] && board[rowIdx][colIdx + i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break;
        }
    }
    return piecesInRow;
}

function checkLeft(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx][colIdx - i] && board[rowIdx][colIdx - i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break;
        }
    }
    return piecesInRow;
}

function checkUpRight(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx - i] && board[rowIdx - i][colIdx + i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break;
        }
    }
    return piecesInRow;
}

function checkDownLeft(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx + i] && board[rowIdx + i][colIdx - i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break;
        }
    }
    return piecesInRow;
}

function checkUpLeft(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx - i] && board[rowIdx - i][colIdx - i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break;
        }
    }
    return piecesInRow;
}

function checkDownRight(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx + i] && board[rowIdx + i][colIdx + i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break;
        }
    }
    return piecesInRow;
}