const container = document.querySelector('.grid-container');
const player = document.querySelector(".player");
const winner = document.querySelector(".winner");
const wonP = document.querySelector(".won");
let currentItem;
let player1 = true;
let board = [...Array(7)].map(x => Array(6).fill(-1));
let gameover = false;

/**
 * Creates each grid item
 */
for (let i = 0; i < (6 * 7); i++) {
    const item = document.createElement('div');
    item.classList.add('grid-item');
    item.classList.add(`num${i}`);
    container.appendChild(item);
}
/**
 * As long as the game is going, it gets the column submitted by the player
 * and switches their turns.
 */
function selectColumn() {
    if (!gameover) {
        let columnNum = +document.getElementById("column").value;
        if (columnNum >= 0 && columnNum <= 7) {
            player.textContent = player1 ? "Player 2's turn" : "Player 1's turn";
            player.style.color = player1 ? "#900C0C" : "#746912";
            player1 = player1 ? false : true;
            placeMark(columnNum);
            document.getElementById("column").value = '';
        }
    }
}
/**
 * If the player hits enter the column is selected. 
 */
document.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        selectColumn();
    }
});
/**
 * Places the mark according to the column selected.
 * It checks if they have won, if so it displays some winning message. 
 * @param {number} columnNum the column selected by the player.
 */
function placeMark(columnNum) {
    for (let i = 5; i >= 0; i--) {
        if (board[columnNum - 1][i] < 0) {
            board[columnNum - 1].splice(i, 1, +player1);
            currentItem = document.querySelector(`.num${(7 * (i + 1)) - (7 - columnNum + 1)}`);
            if (player1) {
                currentItem.style.backgroundColor = "red";
            }
            else currentItem.style.backgroundColor = "yellow";
            if (checkIfWon(columnNum - 1, i, player1)) {
                winner.classList.add('disp');
                wonP.textContent = checkIfWon(columnNum - 1, i, player1);
                winner.style.backgroundColor = !player1 ? "rgba(75,75,5, 0.8)" : "rgba(95,7,7, 0.8)";
                winner.lastElementChild.addEventListener('click', () => window.location.reload());
                player.style.color = "black";
                player.textContent = "Game over!!";
                gameover = true;
            };
            break;
        }
    }
}
/**
 * Runs each direction's check.
 * @param {number} col Column of the cell
 * @param {number} row Row of the cell
 * @param {boolean} player1 Player that chose that cell
 */
function checkIfWon(col, row, player1) {
    const winnerMessage = !player1 ? "Player 1 won" : "Player 2 won"
    // HORIZONTAL
    if (checkHorizontal(col, row, player1)) return winnerMessage;
    // VERTICAL
    else if (checkVertical(col, row, player1)) return winnerMessage;
    // \ negative slope
    else if (checkDiagonalNeg(col, row, player1)) return winnerMessage;
    // / positive slope
    else if (checkDiagonalPos(col, row, player1)) return winnerMessage;
}

function checkHorizontal(col, row, player1) {
    let rep = 1;
    for (let i = col; i < 6 && board[i + 1][row] === +player1; i++, ++rep);
    for (let i = col; i >= 1 && board[i - 1][row] === +player1; i--, ++rep);
    return rep >= 4;
}

function checkVertical(col, row, player1) {
    let rep = 1;
    for (let i = row; i < 6 && board[col][i + 1] === +player1; i++, ++rep);
    for (let i = row; i >= 1 && board[col][i - 1] === +player1; i--, ++rep);
    return rep >= 4;
}

function checkDiagonalNeg(col, row, player1) {
    let rep = 1;
    for (let i = col, j = row; i < 6 && j < 6 && board[i + 1][j + 1] === +player1; i++, j++, rep++);
    for (let i = col, j = row; i >= 1 && j >= 1 && board[i - 1][j - 1] === +player1; i--, j--, rep++);
    return rep >= 4;
}

function checkDiagonalPos(col, row, player1) {
    let rep = 1;
    for (let i = col, j = row; i < 6 && j >= 1 && board[i + 1][j - 1] === +player1; i++, j--, rep++);
    for (let i = col, j = row; i >= 1 && j < 6 && board[i - 1][j + 1] === +player1; i--, j++, rep++);
    return rep >= 4;
}
