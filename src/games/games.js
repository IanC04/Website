(function initTicTacToe() {
    const cells = document.querySelectorAll('.ttt-cell');
    const status = document.getElementById('ttt-status');
    const restartButton = document.getElementById('ttt-restart');

    let board = Array(9).fill(null);
    let gameActive = true;
    let currentPlayer = 'X';
    let botPlayer = 'O';

    const WINS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWin() {
        return WINS.find(w => w.every(i => board[i] === currentPlayer));
    }

    function highlightWin(indices) {
        indices.forEach(index => {
            cells[index].classList.add('win');
        });
    }

    function executeMove(index) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(currentPlayer.toLowerCase());

        const winningCombo = checkWin();
        if (winningCombo) {
            status.textContent = `${currentPlayer} Wins`;
            gameActive = false;
            highlightWin(winningCombo);
            return;
        }

        if (!board.includes(null)) {
            status.textContent = "Draw";
            gameActive = false;
            return;
        }

        switchTurn();
    }

    function switchTurn() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === botPlayer) {
            status.textContent = `Bot's Turn (${currentPlayer})`;
            setTimeout(botMove, 500);
        } else {
            status.textContent = `Your Turn (${currentPlayer})`;
        }
    }

    function botMove() {
        if (!gameActive) {
            return;
        }

        let available = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
        if (available.length > 0) {
            const move = available[Math.floor(Math.random() * available.length)];
            executeMove(move);
        }
    }

    function handlePlayerClick(index) {
        if (board[index] || !gameActive || currentPlayer === botPlayer) {
            return;
        }

        executeMove(index);
    }

    function startNewGame() {
        board.fill(null);
        cells.forEach(c => {
            c.textContent = '';
            c.className = 'ttt-cell';
            c.classList.remove('win');
        });
        gameActive = true;
        currentPlayer = 'X';
        botPlayer = Math.random() < 0.5 ? 'X' : 'O';

        if (currentPlayer === botPlayer) {
            status.textContent = "Bot is X. Thinking...";
            setTimeout(botMove, 500);
        } else {
            status.textContent = "You are X.";
        }
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handlePlayerClick(index));
    });
    restartButton.addEventListener('click', startNewGame);

    startNewGame();
})();

(function initReactionTest() {
    const box = document.getElementById('reaction-box');
    const resultDisplay = document.getElementById('reaction-result');

    let startTime = 0;
    let timeoutId = null;
    let bestTime = null;
    let state = 'start';

    box.addEventListener('click', () => {
        if (state === 'start' || state === 'finished') {
            state = 'waiting';
            box.textContent = "Wait...";
            box.className = "reaction-box wait";
            resultDisplay.textContent = bestTime ? `Best Time: ${bestTime}ms` : "Get ready...";

            const delay = Math.floor(Math.random() * 2000) + 1000;
            timeoutId = setTimeout(() => {
                state = 'ready';
                box.textContent = "Click.";
                box.className = "reaction-box go";
                startTime = Date.now();
            }, delay);
        } else if (state === 'waiting') {
            clearTimeout(timeoutId);
            state = 'start';
            box.textContent = "Too Early. Click to retry.";
            box.className = "reaction-box";
        } else if (state === 'ready') {
            const time = Date.now() - startTime;
            state = 'finished';
            box.textContent = `${time} ms. Click to try again.`;
            box.className = "reaction-box";

            if (!bestTime || time < bestTime) {
                bestTime = time;
                resultDisplay.textContent = `New Best: ${time} ms.`;
            }
        }
    });
})();