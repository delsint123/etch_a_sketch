const canvas = document.querySelector('canvas');

for(let i = 0; i < 256; i++) { //256 will change to variable
    const squares = document.createElement('div');
    squares.classList.add('square');
    squares.setAttribute('id', i);
    document.getElementById('canvas').appendChild(squares);
}

const squares = document.querySelectorAll('.square');
console.log(squares);

squares.forEach(turnBlack);

function turnBlack() {
    addEventListener('mouseover', (e) => {
        const square = document.getElementById(e.composedPath()[0].id);
        square.classList.add('black');
    })
}