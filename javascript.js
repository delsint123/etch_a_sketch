const container = document.querySelector('canvas');

for(let i = 0; i < 256; i++) { //256 will change to variable
    const squares = document.createElement('div');
    document.getElementById('canvas').appendChild(squares);
}