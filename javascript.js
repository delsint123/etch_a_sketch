/*
Project: Etch-A-Sketch
Org/Course: The Odin Project
Date Started: July 21, 2022
Recent Update:
*/

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

const slider = document.createElement('input');
setSliderAttributes();
menu.appendChild(slider);

const sliderValue = document.createElement('div');
menu.appendChild(sliderValue);
sliderValue.innerHTML = slider.value + ' x ' + slider.value;
let singleDimension = slider.value;
let dimensions = slider.value*slider.value;
generateGrid();

slider.oninput = updateSlider;

const resetButton = document.createElement('button');
resetButton.setAttribute('id','reset');
resetButton.textContent = "Reset"
menu.appendChild(resetButton);

resetButton.onclick = reset;

//function definitions

function setSliderAttributes() {
    slider.setAttribute('type', 'range');
    slider.setAttribute('min', '4');
    slider.setAttribute('max', '100');
    slider.setAttribute('value', '16');
    slider.classList.add('slider');
    slider.setAttribute('id', 'range');
}

function updateSlider() {
    sliderValue.innerHTML = slider.value + ' x ' + slider.value;
    singleDimension = slider.value;
    dimensions = slider.value*slider.value;
    updateGrid();
}

function reset() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.classList.remove('black', 'opacity');
        pixel.removeAttribute('style');
    })
}

function removeGrid() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.remove();
    })
}

function generateGrid() {
    const canvas = document.querySelector('#canvas');

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

function setToBlack() {
    if (!colorBlack) {
        opacity = false;
        color = false;
        colorBlack = true;
    }
}

function setToOpacity() {
    if (!opacity) {
        color = false;
        colorBlack = false;
        opacity = true;
    }
}

function setToColor() {
    if (!color) {
        opacity = false;
        colorBlack = false;
        color = true;
    }
}

function assignColor(pixel) {
    if(colorBlack) {
        pixel.classList.remove('opacity', 'color');
        pixel.classList.add('black');
    }
    else if(opacity) {
        pixel.classList.remove('black', 'color');
        getOpacityColor(pixel);                 //add responsiveness
    }
    else if(color) {
        pixel.classList.remove('opacity', 'black');
        getRandomColors(pixel);                   
    };
}

//generate random colors using numbers
function getRandomColors(pixel) {
    let randomRGB = `rgb(${generateNumber()}, ${generateNumber()}, ${generateNumber()})`;
    
    pixel.style.backgroundColor = randomRGB;
}

function generateNumber() {
    //random number between 0 & 255
    let num = Math.floor(Math.random()* (255 + 1));
    return num;        
}

//increase in opacity for each pass
function getOpacityColor(pixel) {
    let opacity = pixel.style.opacity;

    if(opacity == "") {
        opacity = parseFloat('0.0');
    }

    //convert to float (if needed) to complete calculations
    opacity = parseFloat(opacity);

    if(opacity > 1.0) {
        pixel.style.cssText = 'opacity: 1.0; background-color: black';
    }
    else {
        opacity += 0.2;
        pixel.style.cssText = `opacity: ${opacity}; background-color: black`;
    }
}