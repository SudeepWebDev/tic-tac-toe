const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const statusE = document.getElementById('status');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
            cell.classList.add(currentPlayer.toLowerCase());
            cell.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusE.textContent = `Player ${currentPlayer}'s turn`;
            checkWinner();
        }
    });
});

resetButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
    currentPlayer = 'X';
    statusE.textContent = `Player ${currentPlayer}'s turn`;
});

function checkWinner() {
    const winningCombinationsArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinationsArray) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            statusE.textContent = `Player ${cells[a].textContent} wins!`;
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent)) {
        statusE.textContent = "It's a draw!";
    }
}


// Theme setting
document.addEventListener("DOMContentLoaded", function () {
    const circle = document.querySelector(".circle");
    const themePicker = document.getElementById("theme-picker");

    const savedTheme = localStorage.getItem("selectedTheme");

    function setTheme(bgColor) {
        document.body.style.backgroundColor = bgColor;
    }

    circle.addEventListener("click", function () {
        themePicker.classList.toggle("hidden");
    });

    themePicker.addEventListener("click", function (event) {
        if (event.target.classList.contains("theme-picker-item")) {
            const bgColor = event.target.getAttribute("data-bg-color");
            setTheme(bgColor);

            localStorage.setItem("selectedTheme", JSON.stringify({ bgColor }));
            themePicker.classList.add("hidden");
        }
    });

    if (savedTheme) {
        const { bgColor } = JSON.parse(savedTheme);
        setTheme(bgColor);
    }
});
