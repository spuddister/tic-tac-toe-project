const gameBoardModule = (() => {
    let gameboard = ['','','','','','','','',''];
    const startBtn = document.getElementById('startBtn');
    const gameBoardTiles = [...document.getElementsByClassName('tiles')];
    const turnIdentifier = document.getElementsByClassName('card-header-title')[0];
    let playerToken = 'X';
    gameBoardTiles.forEach(tile => {
        tile.addEventListener('click', playValidation)
    });

    function playValidation(e) {
        //Check for valid player move, then call updateGameboard
        let targetTile = e.target.getAttribute('index');
        updateGameboard(targetTile);
    }
    function updateGameboard(tile) {
        
        gameBoardTiles[tile].innerText = playerToken;
        switchTurn();
    }
    function switchTurn() {
        if (playerToken == 'X') {
            playerToken = 'O';
        } else {
            playerToken = 'X';
        }
        turnIdentifier.innerText = "Player " + playerToken + "'s Turn" 
    }
    
    return {
        bindEvents: bindEvents,
        gameBoardTiles: gameBoardTiles
    }
})();
