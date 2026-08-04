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

    return {getBoard};
})();

gameBoard.getBoard();

