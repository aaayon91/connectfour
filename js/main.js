/*----- constants -----*/
const lookup = {
    '1': 'red',
    '-1': 'yellow',
    null: 'white'
}


/*----- app's state (variables) -----*/

let board, winner, turn;

/*----- cached element references -----*/
const tableEl = document.querySelector('table');
const headerEl = document.querySelector('h1'); //need to add id
const squares = document.querySelectorAll('td div'); //may need columns
console.log('THIS IS SQUARES ', squares);
// console.log(squares[8])
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

    board1d = board.flat();
    //players turn
    headerEl.innerText = lookup[turn] + "'s turn"

    //forEach has access to the index number of the current element in the iteration
    board1d.forEach(function(tile,idx) {
        // console.log(tile)
        squares[idx].style.background = lookup[tile]
    })

    //check if there is  a winning meassage need to be displayed
    if(winner === 'tie') {
        headerEl.innerText = "It's a tie!"
    }else if(winner) {
        headerEl.innerText = lookup[winner] + " has won the game!"
    }
}

function checkWin(rowIdx, colIdx) {
    // Each direction function can return a number of 'how many in a row'
    // store all those numbers in variable and then you can check:
    // if upPieces + downPieces <= 3
    const downPieces = checkDown(rowIdx, colIdx);
    const rightPieces = checkRight(rowIdx, colIdx);
    const leftPieces = checkLeft(rowIdx, colIdx);
    const upRightPieces = checkUpRight(rowIdx, colIdx);
    const downLeftPieces = checkDownLeft(rowIdx, colIdx);
    const upLeftPieces = checkUpLeft(rowIdx, colIdx);
    const downRightPieces = checkDownRight(rowIdx, colIdx);
    
    if (downPieces === 3) {
        winner = turn;  
        tableEl.removeEventListener('click', handleTurn);
    } else if (rightPieces === 3){
        winner = turn;  
        tableEl.removeEventListener('click', handleTurn);
    } else if (leftPieces === 3){
        winner = turn;  
        tableEl.removeEventListener('click', handleTurn);
    } else if (upRightPieces + downLeftPieces === 3) {
        winner = turn;  
        tableEl.removeEventListener('click', handleTurn);
    } else if ((upLeftPieces + downRightPieces) === 3) {
        winner = turn;  
        tableEl.removeEventListener('click', handleTurn);
    } else if(!winner && !board[rowIdx].includes(null)) {
        console.log('Hi')
        winner = 'tie'
    } 
}


function handleTurn(evt) {
    // console.log(evt.target)
    let rowIdx = parseInt(evt.target.id.substr(1, 1))
    // console.log(evt.target.id);
    // console.log(rowIdx);

    let colIdx = parseInt(evt.target.id.substr(3, 1))
    // console.log(evt.target.id);
    // console.log(colIdx);

    // console.log(board[rowIdx][colIdx])

    // loop from the bottom of the column to the top
    // find first empty spot and populate with the player's value
    if (board[0][colIdx]) {
        console.log('This column is filled up')
    } else {
        for (let i = 5; i >= 0; i-- ) {
            rowIdx = i;
            if (board[rowIdx][colIdx] === null) {
                board[rowIdx][colIdx] = turn;
                // console.log(rowIdx);
                checkWin(rowIdx, colIdx);
                changeTurn()
                render();
                break;
            }
        }
    }
}

function changeTurn() {
    turn *= -1;
}

// all this function should return is a number of how many pieces in a row
function checkDown(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        // console.log('board[rowIdx - i][colIdx] : ', board[rowIdx - i][colIdx])
        // console.log('turn: ', turn)
        if (board[rowIdx + i] && board[rowIdx + i][colIdx] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break
        }
    }
    return piecesInRow
}

function checkRight(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        // console.log('board[rowIdx][colIdx + i]: ', board[rowIdx][colIdx + i])
        if (board[rowIdx][colIdx + i] && board[rowIdx][colIdx + i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break
        }
    }
    return piecesInRow
}

function checkLeft(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx][colIdx - i] && board[rowIdx][colIdx - i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break
        }
    }
    return piecesInRow
}

function checkUpRight(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx - i] && board[rowIdx - i][colIdx + i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break
        }
    }
    return piecesInRow
}

function checkDownLeft(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx + i] && board[rowIdx + i][colIdx - i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break
        }
    }
    return piecesInRow
}

function checkUpLeft(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx - i] && board[rowIdx - i][colIdx - i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break
        }
    }
    return piecesInRow
}

function checkDownRight(rowIdx, colIdx) {
    let piecesInRow = 0;
    for (let i = 1; i <= 5; i++) {
        if (board[rowIdx + i] && board[rowIdx + i][colIdx + i] === turn) {
            piecesInRow = piecesInRow + 1;
        }else {
            break
        }
    }
    return piecesInRow
}