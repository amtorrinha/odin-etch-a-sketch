// Create Grid
const grid = document.querySelector('.grid');
const squareSizeDiv = document.querySelector('.square-size');
const gridWidth = parseInt(window.getComputedStyle(grid).minWidth);
let gridSize = 16;
let isMouseDown = false;

let createGrid = () => {
    resetGrid();
    squareSizeDiv.innerHTML = "Current Size: " + gridSize + " x " + gridSize;
    for (let i = 0; i < gridSize * gridSize; i++) {
        let div = document.createElement('div');
        div.classList.add('grid-div');
        div.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            e.target.style.background = 'black';
        });
        div.addEventListener('mouseup', (e) => {
            isMouseDown = false;
        });
        div.addEventListener('mouseover', (e) => {
            if (isMouseDown) {
                e.target.style.background = 'black';
            }
        });
        div.setAttribute('grid-id', i);
        let squareSize = gridWidth / gridSize;
        div.style.width = squareSize + "px";
        div.style.height = squareSize + "px";
        grid.appendChild(div);
    }
}

let resetGrid = () => {
    grid.innerHTML = '';
}

let changeGridSize = () => {
    let newSize = parseInt(prompt("Enter grid size (max 64)"));
    if (newSize > 64) newSize = 64;
    gridSize = newSize;
    createGrid();
}

// Button Event
const gridBtn = document.querySelector('.grid-btn');
gridBtn.addEventListener('click', () => {
    changeGridSize();
});
const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
    createGrid();
});


createGrid();
