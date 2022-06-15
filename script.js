const Player = (name, token) => {
    let coveredTiles = [];
    let score = 0;
    const addTile = (newTileIndex) => {
        coveredTiles.push(newTileIndex);
        coveredTiles.sort();
    }
    const incrementScore = () => score++;
    const getTiles = () => coveredTiles;
    const getName = () => name;
    const getToken = () => token;
    const getScore = () => score;
    const clearTiles = () => {coveredTiles = [];}

    return {getName, addTile, getTiles, getToken, incrementScore, getScore, clearTiles}
}

const player1 = Player('Player X', 'X');
const player2 = Player('Player O', 'O');

const gameBoardModule = (() => {
    let gameboard = ['','','','','','','','',''];
    const winningCombos = [[1,2,3],[4,5,6],[7,8,9],
                         [1,4,7],[2,5,8],[3,6,9],
                         [1,5,9],[3,5,7]];
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const gameBoardTiles = [...document.getElementsByClassName('tiles')];
    const turnIdentifier = document.getElementsByClassName('card-header-title')[0];
    const scoreboard = document.getElementsByClassName('card-header-icon')[0];
    let currentPlayer = player1;
    
    gameBoardTiles.forEach(tile => {
        tile.addEventListener('click', playValidation);
    });

    restartBtn.addEventListener('click', startRound);

    function playValidation(playEvent) {
        //Check for valid player move, then call updateGameboard
        let targetTile = playEvent.target.getAttribute('index');
        if (gameboard[targetTile] === '' && !checkForWin()) {
            gameboard[targetTile] = currentPlayer.getToken();
            currentPlayer.addTile(Number(targetTile)+1);
            updateGameboard(targetTile);
            if (checkForWin()) {
                endRound();
            } else {
                switchTurns();
            }
        }
    }
    function updateGameboard(targetTile) {
        gameBoardTiles[targetTile].innerText = currentPlayer.getToken();
    }
    
    function resetGameboard() {
        gameboard = ['','','','','','','','',''];
        gameBoardTiles.forEach(tile => {
            tile.innerText = '';
        });
    }

    function checkForWin() {
        //Compare to winning combinations to determine if victory 
        for (i = 0; i < winningCombos.length; i++){
            if (
                currentPlayer.getTiles().includes(winningCombos[i][0]) && 
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
    }

    function updateScoreboard() {
        scoreboard.innerText = `Score ${player1.getScore()}:${player2.getScore()}`;
        // if (player1.getScore == 3) {

        // }
    }

    function switchTurns() {
        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
        turnIdentifier.innerText = `${currentPlayer.getName()}'s Turn`; 
    }

    function startRound() {
        resetGameboard();
        switchTurns();
        player1.clearTiles();
        player2.clearTiles();
    }
})();
