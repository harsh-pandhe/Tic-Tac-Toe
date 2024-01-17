(function () {
    const TicTacToeGame = {
        currentPlayer: null,
        player1: null,
        player2: null,
        board: [],

        showToast(message) {
            Toastify({
                text: message,
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                close: true,
                newWindow: true,
                callback: () => console.log('Toast dismissed!'),
                onClick: () => console.log('Toast clicked!'),
                style: {
                    border: '1px solid #4caf50',
                    borderRadius: '10px',
                    color: '#fff',
                    padding: '20px',
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                },
                positionLeft: false,
                offset: { x: 20, y: 20 },
            }).showToast();
        },

        startGame() {
            this.player1 = document.getElementById('player1').value;
            this.player2 = document.getElementById('player2').value;

            if (this.player1 === '' || this.player2 === '') {
                this.showToast('Please enter both players\' names.');
                return;
            }

            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('gamePage').style.display = 'block';

            this.currentPlayer = Math.random() < 0.5 ? this.player1 : this.player2;
            document.getElementById('currentPlayer').innerText = `${this.currentPlayer}'s turn`;

            this.initializeBoard();
        },

        initializeBoard() {
            this.board = Array(9).fill('');
            this.renderBoard();
        },

        renderBoard() {
            const boardElement = document.getElementById('board');
            boardElement.innerHTML = '';

            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.setAttribute('data-index', i);
                cell.addEventListener('click', this.makeMove.bind(this));
                cell.innerText = this.board[i];
                boardElement.appendChild(cell);
            }
        },

        makeMove(event) {
            const index = event.target.getAttribute('data-index');

            if (this.board[index] === '' && !this.checkWinner()) {
                this.board[index] = this.currentPlayer === this.player1 ? 'X' : 'O';
                this.renderBoard();

                if (this.checkWinner()) {
                    this.showToast(`${this.currentPlayer} wins!`);
                } else if (this.board.every(cell => cell !== '')) {
                    this.showToast('It\'s a tie!');
                } else {
                    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
                    document.getElementById('currentPlayer').innerText = `${this.currentPlayer}'s turn`;
                }
            }
        },

        checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6]             // diagonals
            ];

            for (const combination of winningCombinations) {
                const [a, b, c] = combination;
                if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                    return true;
                }
            }

            return false;
        },

        resetGame() {
            this.initializeBoard();
            document.getElementById('currentPlayer').innerText = `${this.currentPlayer}'s turn`;
        },

        logout() {
            document.getElementById('loginPage').style.display = 'block';
            document.getElementById('gamePage').style.display = 'none';
            document.getElementById('player1').value = '';
            document.getElementById('player2').value = '';
            this.currentPlayer = null;
            this.initializeBoard();
            document.getElementById('currentPlayer').innerText = '';
        }
    };

    window.TicTacToeGame = TicTacToeGame;
})();
