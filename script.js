const Player = (name, token) => {
    let coveredTiles = [];
    const addTile = (newTileIndex) => {
        coveredTiles.push(newTileIndex);
        coveredTiles.sort();
    }
    const getTiles = () => coveredTiles;
    const getName = () => name;
    const getToken = () => token;

    return {getName, addTile, getTiles, getToken}
}

const player1 = Player('Player X', 'X');
const player2 = Player('Player O', 'O');

const gameBoardModule = (() => {
    let gameboard = ['','','','','','','','',''];
    const winningCombos = [[1,2,3],[4,5,6],[7,8,9],
                         [1,4,7],[2,5,8],[3,6,9],
                         [1,5,9],[3,5,7]];
    const startBtn = document.getElementById('startBtn');
    const gameBoardTiles = [...document.getElementsByClassName('tiles')];
    const turnIdentifier = document.getElementsByClassName('card-header-title')[0];
    let currentPlayer = player1;
    gameBoardTiles.forEach(tile => {
        tile.addEventListener('click', playValidation)
    });

    function playValidation(e) {
        //Check for valid player move, then call updateGameboard
        let targetTile = e.target.getAttribute('index');
        if (gameboard[targetTile] === '') {
            gameboard[targetTile] = currentPlayer.getToken();
            currentPlayer.addTile(targetTile);
            updateGameboard(targetTile);
            checkForWin();
            switchTurns();
        }
    }
    function updateGameboard(targetTile) {
        gameBoardTiles[targetTile].innerText = currentPlayer.getToken();
    }

    function checkForWin() {
        //Compare to winning combinations to determine if victory 
    }

    function switchTurns() {
        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
        turnIdentifier.innerText = currentPlayer.getName() + "'s Turn"; 
    }

})();
