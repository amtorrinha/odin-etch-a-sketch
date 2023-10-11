// Vars
const BLACK = "black";
const WHITE = "white";
const grid = document.querySelector('.grid');
const squareSizeDiv = document.querySelector('.square-size');
const gridWidth = parseInt(window.getComputedStyle(grid).minWidth);
let gridSize = 16;
let defaultColor = BLACK;
let isMouseDown = false;
let randomColorMode = false;
let darkeningEffectMode = false;

// Functions
let createGrid = () => {
    resetGrid();
    squareSizeDiv.innerHTML = "Current Size: " + gridSize + " x " + gridSize;
    for (let i = 0; i < gridSize * gridSize; i++) {
        let div = document.createElement('div');
        div.classList.add('grid-div');
        div.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            colorDiv(e);
        });
        div.addEventListener('mouseup', (e) => {
            isMouseDown = false;
        });
        div.addEventListener('mouseover', (e) => {
            if (isMouseDown) {
                colorDiv(e);
            }
        });
        div.setAttribute('grid-id', i);
        let squareSize = gridWidth / gridSize;
        div.style.width = squareSize + "px";
        div.style.height = squareSize + "px";
        grid.appendChild(div);
    }
}

let colorDiv = (e) => {
    if (darkeningEffectMode) {
        let current = e.target.style.filter;
        if (!current) {
            current = "90";
            e.target.style.filter = `brightness(${current}%)`;
        } else { // matches and decreases brightness value in filter string
            matches = current.match(/(.*)\((.*)\)/);
            current = parseInt(matches[2].replace(/[^\d.]/g,""));
            e.target.style.filter = `brightness(${current - 10}%)`;
        }
    } else {
        if (!randomColorMode) {
            e.target.style.background = defaultColor;
            if (defaultColor === WHITE) e.target.style.filter = `brightness(100%)`;
        } else {
            const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
            const r = randomBetween(0, 255);
            const g = randomBetween(0, 255);
            const b = randomBetween(0, 255);
            const rgb = `rgb(${r},${g},${b})`;
            e.target.style.background = rgb;
        }
    }
}

let resetGrid = () => {
    grid.innerHTML = '';
}

let changeGridSize = () => {
    let newSize = parseInt(prompt("Enter grid size (max 100)"));
    if (newSize > 100) newSize = 100;
    gridSize = newSize;
    createGrid();
}

// Button Events
const gridBtn = document.querySelector('.grid-btn');
gridBtn.addEventListener('click', () => {
    changeGridSize();
});
const eraserBtn = document.querySelector('.eraser-btn');
eraserBtn.addEventListener('click', () => {
    if (defaultColor === BLACK) defaultColor = WHITE
    else defaultColor = BLACK
    randomColorMode = false;
    darkeningEffectMode = false;
});
const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
    createGrid();
});
const randomColorBtn = document.querySelector('.random-btn');
randomColorBtn.addEventListener('click', () => {
    if (!randomColorMode) randomColorMode = true 
    else randomColorMode = false;
    darkeningEffectMode = false;
});
const darkeningBtn = document.querySelector('.darkening-btn');
darkeningBtn.addEventListener('click', () => {
    if (!darkeningEffectMode) darkeningEffectMode = true 
    else darkeningEffectMode = false;
});

// Default Create Grid
createGrid();
