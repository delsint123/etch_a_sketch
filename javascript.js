const canvas = document.querySelector('#canvas');

for(let i = 0; i < 256; i++) { //256 will change to variable
    const squares = document.createElement('div');
    squares.classList.add('pixel');
    squares.setAttribute('id', i);
    document.getElementById('canvas').appendChild(squares);
}

const pixels = document.querySelectorAll('.pixel');
console.log(pixels);

pixels.forEach(pixel => {
    pixel.addEventListener('mouseover', (e) => {
        const pixel = document.getElementById(e.composedPath()[0].id);
        pixel.classList.add('black');
    })
});

const menu = document.querySelector('#menu');

const resetButton = document.createElement('button');
resetButton.setAttribute('id','reset');
resetButton.textContent = "Reset"
menu.appendChild(resetButton);

document.getElementById("reset").onclick = reset;

function reset() {
    pixels.forEach(pixel => {
        pixel.classList.remove('black');
    })
}