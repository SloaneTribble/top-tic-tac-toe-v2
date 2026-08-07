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

        console.log(boardString);
        
    }

    const place = (space, symbol) => {
        // only place symbols in empty spaces
        if (_board[space] != "_"){
            return false;
        }
        _board[space] = symbol;
        const cell = document.getElementById(space.toString());
        cell.innerText = symbol;
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

const game = (function() {

    const turnIndicator = document.getElementById("turn-indicator");

    let gameOver = false;
    let winner, placed;
    let turns = 0 ;

    let gameOn = false;

    let currentPlayer, playerOne, playerTwo;


    const newGame = () => {

        // Game on!
        gameOn = true;


        const playerOneName = document.getElementById("player-one-name").value;
        console.log("Player one name: ", playerOneName);

        const playerTwoName = document.getElementById("player-two-name").value;
        console.log("Player two name: ", playerTwoName);

        const playerOneXRadioButton = document.getElementById("player-one-x");

        const playerOneSymbol = playerOneXRadioButton.checked ? "X" : "O";

        const playerTwoSymbol = (playerOneSymbol == "X") ? "O" : "X";

        playerOne = player(playerOneName, playerOneSymbol);
        playerTwo = player(playerTwoName, playerTwoSymbol);

        gameOver = false;
        winner = null;
        placed = false;
        turns = 0;


        // player with X goes first so we set them as the default 
        currentPlayer = (playerOne.symbol == "X") ? playerOne : playerTwo;

        function getPlayerStats(){
            console.log("First player: ");
            console.log(playerOne.name, playerOne.symbol);

            console.log("Second player: ");
            console.log(playerTwo.name, playerTwo.symbol);

            console.log(currentPlayer.name, " will go first.");
        }

        getPlayerStats();

        turnIndicator.textContent = currentPlayer.symbol;

        // update DOM to indicate the game's current state -- player names and symbols, and whose turn it is 

    }


    const gameTurn = (spaceThatPlayerClickedOn) => {

        if(!gameOn){
            return;
        }

        placed = gameBoard.place(spaceThatPlayerClickedOn, currentPlayer.symbol);
        // player may have clicked on an occupied space, in which case they should get to try again
        if (!placed) {return;}

        
        gameOver = gameBoard.checkForWinners();
        if(gameOver){
            console.log(`${currentPlayer.name} wins!`);
            gameBoard.reset();
            gameOn = false;
            return;
        }

        turns++;
        
        if(turns == 9){
            // no spaces left on the board
            turnIndicator.textContent = "Tie!";
            console.log("Tie!");
            gameBoard.reset();
            gameOn = false;
            return;
        }

        // the other player goes next turn;
        currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne;
        turnIndicator.textContent = currentPlayer.symbol;
        placed = false;

        gameBoard.getBoard();



    }

    return {
        newGame,
        gameTurn
    }


})();


const playerForm = document.getElementById("player-details-form");

playerForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    game.newGame();
});

const gameBoardDiv = document.getElementById("game-board");
gameBoardDiv.addEventListener("click", (e) => {
    const targetCellId = parseInt(e.target.id);
    game.gameTurn(targetCellId);
})


const playerOneXLabel = document.getElementById("player-one-x-label");
const playerOneNameFormField = document.getElementById("player-one-name");

playerOneNameFormField.addEventListener("input", (e) =>{
    console.log(playerOneNameFormField.value);
    playerOneXLabel.textContent = playerOneNameFormField.value;
});

const playerTwoXLabel = document.getElementById("player-two-x-label");
const playerTwoNameFormField = document.getElementById("player-two-name");

playerTwoNameFormField.addEventListener("input", (e) =>{
    console.log(playerTwoNameFormField.value);
    playerTwoXLabel.textContent = playerTwoNameFormField.value;
});




