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
    //players turn
    headerEl.innerText = lookup[turn] + "'s turn"

    //forEach has access to the index number of the current element in the iteration
    board.forEach(function(tile,idx) {
        squares[idx].style.background = lookup[tile]
    })

    //check if there is  a winning meassage need to be displayed
    if(winner === 'tie') {
        headerEl.innerText = "It's a tie!"
    }else if(winner) {
        headerEl.innerText = lookup[winner] + " has won the game!"
    }
}

function checkWin() {
    //checkUp:
    // if {

    // }


    //checkDown:


    //checkRight:


    //checkLeft:


    //checkUpRight:


    //checkDownRight:


    //checkUpLeft:


    //checkDownLeft:


}

function handleTurn(evt) {
    console.log(evt.target)
    let rowIdx = evt.target.id.substr(1, 1)
        // console.log(evt.target.id);
        // console.log(rowIdx);

        let colIdx = evt.target.id.substr(3, 1)
        // console.log(evt.target.id);
        // console.log(colIdx);

    if (!board[rowIdx][colIdx]) {
        board[rowIdx][colIdx] = turn;
        console.log(board[rowIdx][colIdx])
        checkWin();
        turn *= -1;
        render();
    }
}