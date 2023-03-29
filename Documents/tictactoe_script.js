const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('.reset');
let turn = 1;

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box.textContent === '') {
            if (turn % 2 === 1) {
                box.textContent = 'X';
                document.querySelector('p').textContent = "Player 2's turn (O)";
            } else {
                box.textContent = 'O';
                document.querySelector('p').textContent = "Player 1's turn (X)";
            }
            turn++;
            checkWinner();
        }
    });
});

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
            endGame();
            return;
        }
    }

        let isTie = true;
    for (let i = 0; i < boxes.length; i++) {
        if (!boxes[i].textContent) {
            isTie = false;
            break;
        }
    }

    if (isTie) {
        document.querySelector('p').textContent = "It's a tie!";
        endGame();
    }
}

function endGame() {
    boxes.forEach(box => box.removeEventListener('click', () => {}));
    resetBtn.style.display = 'block';
    resetBtn.addEventListener('click', () => {
        boxes.forEach(box => {
            box.textContent = '';
            box.addEventListener('click', () => {});
        });
        turn = 1;
        document.querySelector('p').textContent = "Player 1's turn (X)";
        resetBtn.style.display = 'none';
    });
}
