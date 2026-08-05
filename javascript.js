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

    const gameBoardDiv = document.getElementById("game-board");

    const initialBoardState = ["_","_","_",
                   "_", "_", "_",
                   "_", "_", "_"];

    
    let _board = ["_","_","_",
                   "_", "_", "_",
                   "_", "_", "_"];

    const getBoard = () => {

        const boardString = 
        `${_board[0]},${_board[1]},${_board[2]}
        ${_board[3]},${_board[4]},${_board[5]}
        ${_board[6]},${_board[7]},${_board[8]} `;
        gameBoardDiv.innerText = boardString;
        
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
        if (topLeft != "_" && topLeft == _board[4] && topLeft == _board[8]){
            return true;
        }
        let topRight = _board[2];
        if (topRight != "_" && topRight == _board[4] && topRight == _board[6]){
            return true;
        }

        // no matches found
        return false;

    }

    return {
        getBoard, 
        place, 
        reset, 
        checkForWinners
    };
})();

function player(name, symbol){

    return {
        name,
        symbol
    }
}


async function newGame() {
    
    async function sleep(){
        return new Promise((resolve) => setTimeout(resolve, 300));
    }

    const firstPlayerName = prompt("First player name: ", "Default Danny");
    const firstPlayerSymbol = prompt("First player symbol: ", "X");

    const playerOne = player(firstPlayerName, firstPlayerSymbol);

    const secondPlayerName = prompt("Second player name: ", "Default Darry");
    const secondPlayerSymbol = (firstPlayerSymbol == "X") ? "O" : "X";

    const playerTwo = player(secondPlayerName, secondPlayerSymbol);

    function getPlayerStats(){
        console.log("First player: ");
        console.log(playerOne.name, playerOne.symbol);

        console.log("Second player: ");
        console.log(playerTwo.name, playerTwo.symbol);
    }

    let gameOver = false;
    let winner;
    let turns = 0;

    // X goes first each round so we put them at the beginning of an array to be iterated through each round
    const players = (playerOne.symbol == "X") ? [playerOne, playerTwo] : [playerTwo, playerOne];
    let playerIndex = 0; 

    let currentPlayer, placed, choice;
    

    while(true){
        if(turns == 9){
            // no spaces left on the board
            console.log("Tie!");
            gameBoard.reset();
            return;
        }
        // each round, X goes first
        // player choices may not be valid, so let them keep trying
        while(!placed){
            currentPlayer = players[playerIndex];
            choice = prompt(`${currentPlayer.name}'s turn (index 0-8): `);
            choice = parseInt(choice);
            placed = gameBoard.place(choice, currentPlayer.symbol);
        }

        window.requestAnimationFrame(gameBoard.getBoard);
        await sleep();

        gameOver = gameBoard.checkForWinners();
        if(gameOver){
            console.log(`${currentPlayer.name} wins!`);
            gameBoard.reset();
            return;
        }
        
        // prepare for the next round
        placed = false;

        // switch back and forth between 0 and 1 each iteration;
        playerIndex = (playerIndex == 0) ? 1 : 0;
        turns++;
        
    }

    return {
        getPlayerStats
    }

}


const game = newGame();



