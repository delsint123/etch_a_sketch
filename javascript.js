const menu = document.querySelector('#menu');

const blackButton = document.createElement('button');
let colorBlack = true;                          //default color
blackButton.setAttribute('id','blackButton');
blackButton.textContent = "Black"
menu.appendChild(blackButton);

const opacityButton = document.createElement('button');
let opacity = false;
opacityButton.setAttribute('id','opacityButton');
opacityButton.textContent = "Black Opacity"
menu.appendChild(opacityButton);

const colorButton = document.createElement('button');
let color = false;
colorButton.setAttribute('id','colorButton');
colorButton.textContent = "Color"
menu.appendChild(colorButton);

blackButton.onclick = setToBlack;

opacityButton.onclick = setToOpacity;

colorButton.onclick = setToColor;

function setToBlack() {
    if (!colorBlack) {
        reset();            //may remove
        opacity = false;
        color = false;
        colorBlack = true;
    }
    console.log(opacity, color, colorBlack);
}

function setToOpacity() {
    if (!opacity) {
        reset();            //may remove
        color = false;
        colorBlack = false;
        opacity = true;
    }
    console.log(opacity, color, colorBlack);
}

function setToColor() {
    if (!colorBlack) {
        reset();            //may remove
        opacity = false;
        colorBlack = false;
        color = true;
    }
    console.log(opacity, color, colorBlack);
}

const slider = document.createElement('input');
slider.setAttribute('type', 'range');
slider.setAttribute('min', '4');
slider.setAttribute('max', '100');
slider.setAttribute('value', '16');
slider.classList.add('slider');
slider.setAttribute('id', 'range');
menu.appendChild(slider);

const canvas = document.querySelector('#canvas');

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

const resetButton = document.createElement('button');
resetButton.setAttribute('id','reset');
resetButton.textContent = "Reset"
menu.appendChild(resetButton);

resetButton.onclick = reset;

function reset() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.classList.remove('black', 'color', 'opacity');
    })
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
            assignColor(pixel);
        })
    });
}

function assignColor(pixel) {
    if(colorBlack) {
        pixel.classList.remove('opacity', 'color');
        pixel.classList.add('black');
    }
    else if(opacity) {
        pixel.classList.remove('black', 'color');
        pixel.classList.add('opacity');
    }
    else if(color) {
        pixel.classList.remove('opacity', 'black');
        pixel.classList.add('color');
    };
}