const canvas = document.querySelector('#canvas');
const menu = document.querySelector('#menu');

const resetButton = document.createElement('button');
resetButton.setAttribute('id','reset');
resetButton.textContent = "Reset"
menu.appendChild(resetButton);

document.getElementById("reset").onclick = reset;

function reset() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.classList.remove('black');
    })
}

const slider = document.createElement('input');
slider.setAttribute('type', 'range');
slider.setAttribute('min', '4');
slider.setAttribute('max', '100');
slider.setAttribute('value', '16');
slider.classList.add('slider');
slider.setAttribute('id', 'range');
menu.appendChild(slider);

const sliderValue = document.createElement('div');
menu.appendChild(sliderValue);
sliderValue.innerHTML = slider.value + ' x ' + slider.value;
let singleDimension = slider.value;
let dimensions = slider.value*slider.value;
generateGrid();

slider.oninput = () => {
    sliderValue.innerHTML = slider.value + ' x ' + slider.value;
    singleDimension = slider.value;
    dimensions = slider.value*slider.value;
    updateGrid();
}

function removeGrid() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.remove();
    })
}

function generateGrid() {
    for(let i = 0; i < dimensions; i++) { //256 will change to variable
        const squares = document.createElement('div');
        squares.classList.add('pixel');
        squares.setAttribute('id', i);
        canvas.appendChild(squares);
    }
    canvas.style.gridTemplateColumns = `repeat(${singleDimension}, auto)`;
    makeBrush();
}

function updateGrid() {
    reset();
    removeGrid();
    generateGrid();
    makeBrush();
}

function makeBrush() {
    const pixels = document.querySelectorAll('.pixel');
    console.log(pixels); 

    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', (e) => {
            const pixel = document.getElementById(e.composedPath()[0].id);
            pixel.classList.add('black');
        })
    });
}