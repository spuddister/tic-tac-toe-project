const Player = (name, token) => {
    let coveredTiles = [];
    let score = 0;
    const addTile = (newTileIndex) => {
        coveredTiles.push(newTileIndex);
        coveredTiles.sort();
    }
    const resetPlayer = () => {
        score = 0;
        clearTiles();
    }
    const incrementScore = () => score++;
    const getTiles = () => coveredTiles;
    const getName = () => name;
    const getToken = () => token;
    const getScore = () => score;
    const clearTiles = () => {coveredTiles = [];}

    return {getName, addTile, getTiles, getToken, incrementScore, getScore, clearTiles, resetPlayer}
}

const player1 = Player('Player X', 'X');
const player2 = Player('Player O', 'O');

//The game controller module
const gameBoardModule = (() => {
    let gameboard = ['','','','','','','','',''];
    const winningCombos = [[1,2,3],[4,5,6],[7,8,9],
                         [1,4,7],[2,5,8],[3,6,9],
                         [1,5,9],[3,5,7]];
    const gameContainer = document.getElementsByClassName('game-box')[0];
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', ()=> {
        gameContainer.classList.add('game-box-transform');
        gameContainer.classList.remove('game-box');
        startBtn.classList.remove('game-box-transform');
        startBtn.classList.add('game-box');
    });
    const restartBtn = document.getElementById('restartBtn');
    const gameBoardTiles = [...document.getElementsByClassName('tiles')];
    const turnIdentifier = document.getElementsByClassName('card-header-title')[0];
    const scoreboard = document.getElementsByClassName('card-header-icon')[0];
    let currentPlayer = player1;
    let turnCounter = 0;
    
    gameBoardTiles.forEach(tile => {
        tile.addEventListener('click', playValidation);
    });

    restartBtn.addEventListener('click', startRound);

    function playValidation(playEvent) {
        //Check for valid player move, then call updateGameboard
        let targetTile = playEvent.target.getAttribute('index');
        if (gameboard[targetTile] === '' && !roundWin()) { //checks if the tile is empty and if someone hasn't already won the game
            gameboard[targetTile] = currentPlayer.getToken();
            currentPlayer.addTile(Number(targetTile)+1);
            updateGameboard(targetTile);
            if (roundWin()) {
                endRound();
            } else if (turnCounter >= 9) { 
                turnIdentifier.innerText = `It's a Draw`;
            } else {
                switchTurns();
            }
        }
    }
    function updateGameboard(targetTile) {
        turnCounter++;
        gameBoardTiles[targetTile].innerText = currentPlayer.getToken();
    }
    
    function resetGameboard() {
        gameboard = ['','','','','','','','',''];
        gameBoardTiles.forEach(tile => {
            tile.innerText = '';
        });
    }

    function roundWin() {
        //Compare to winning combinations to determine if victory 
        for (i = 0; i < winningCombos.length; i++){
            if (currentPlayer.getTiles().includes(winningCombos[i][0]) && 
                currentPlayer.getTiles().includes(winningCombos[i][1]) && 
                currentPlayer.getTiles().includes(winningCombos[i][2])) {
                return true;
            } 
        }
        return false;
    }

    function endRound() {
        currentPlayer.incrementScore();
        updateScoreboard();
        if (currentPlayer.getScore() >= 3) { //If victory...
            endGame();
        } else {
            turnIdentifier.innerText = `${currentPlayer.getName()} wins the round`;
            restartBtn.innerText = 'Next Round';
        }
    }

    function updateScoreboard() {
        scoreboard.innerText = `Score ${player1.getScore()}:${player2.getScore()}`;
    }

    function switchTurns() {
        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
        turnIdentifier.innerText = `${currentPlayer.getName()}'s Turn`; 
    }

    function startRound() {
        resetGameboard();
        switchTurns();
        updateScoreboard();
        player1.clearTiles();
        player2.clearTiles();
        turnCounter = 0;
    }

    function endGame() {
        turnIdentifier.innerText = `${currentPlayer.getName()} wins the game!`;
        player1.resetPlayer();
        player2.resetPlayer();
        restartBtn.innerText = 'Restart';
    }
})();
