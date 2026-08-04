/**
 * Use factories as much as possible. 
 *  If you only need a single instance of something, wrap the factory in an IIFE
 * 
 * Each piece of functionality should fit in the 'game', 'player', or 'gameboard' objects
 * 
 * Consider having single- and two-player options
 */

'use strict';

const gameBoard = (function() {

    const initialBoardState = ["_","_","_",
                   "_", "_", "_",
                   "_", "_", "_"];

    
    let _board = ["_","_","_",
                   "_", "_", "_",
                   "_", "_", "_"];

    const getBoard = () => {
        console.log(
            `${_board[0]},${_board[1]},${_board[2]}`,
            "\n",`${_board[3]},${_board[4]},${_board[5]} `, 
            "\n",`${_board[6]},${_board[7]},${_board[8]} ` );
    }

    const place = (space, symbol) => {
        // only place symbols in empty spaces
        if (_board[space] != "_"){
            return false;
        }
        _board[space] = symbol;
        getBoard();
        return true;
    }

    const reset = () => {
        _board = initialBoardState;
    }

    // search each column, row and diagonal for straight lines of three matching symbols
    const checkForWinners = () => {
        // search columns
        for (let i = 0; i < 2; i++){
            let space = _board[i];
            if (space != "_" 
                && space == _board[i + 3] 
                && space == _board[i + 6])
                {
                return true;
            }
        }
        // search rows
        for (let i = 0; i < 2; i+= 3){
            let space = _board[i];
            if (space != "_"
                && space == _board[i + 1]
                && space == _board[i + 2])
                {
                return true;
            }
        }
        // search diagonals
        let topLeft = _board[0];
        if (topLeft == _board[4] && topLeft == _board[8]){
            return true;
        }
        let topRight = _board[2];
        if (topRight == _board[4] && topRight == _board[6]){
            return true;
        }

        // no matches found
        return false;

    }

    return {getBoard, place, reset, checkForWinners};
})();

gameBoard.getBoard();
gameBoard.place(2, 'X');
gameBoard.place(4, 'X');
let win = gameBoard.checkForWinners();
console.log(win);
gameBoard.place(6, 'X');
win = gameBoard.checkForWinners();
console.log(win);


