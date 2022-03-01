const lines = document.querySelector('#pixel-board');
const userInput = document.querySelector('#board-size');
const createButton = document.querySelector('#generate-board');
const inicialColor = document.querySelector('#color1').classList.add('selected');
const color1 = document.querySelector('#color1');
const color2 = document.querySelector('#color2');
const color3 = document.querySelector('#color3');
const color4 = document.querySelector('#color4');

function createUserBoard() {
  let valor = userInput.value;
  let pixels = document.querySelectorAll('.pixel');
  if (valor === '') {
    window.alert('Board inválido!');
  }
  else if (valor < 5) {
    valor = 5;
    for (let index of pixels) {
      index.remove();
    }
    createPixel(lines, valor);
  }
  else if (valor > 50) {
    valor = 50;
    for (let index of pixels) {
      index.remove();
    }
    createPixel(lines, valor);
  }
  else if (valor <= 50 && valor >= 5) {
    for (let index of pixels) {
      index.remove();
    }
    createPixel(lines, valor);
  }
}

createButton.addEventListener('click', createUserBoard);

function createPixel(lines, userParam, event) {
  const npixels = userParam * userParam;
  const width = userParam * 45;
  const height = userParam * 45;
  lines.style.height = height + 'px';
  lines.style.width = width + 'px';
  for (let index = 1; index <= npixels; index += 1) {
    const pixelBox = document.createElement('div');
    pixelBox.className = 'pixel';
    lines.appendChild(pixelBox);
  }
  let pixels = document.querySelectorAll('.pixel');
  pixels.forEach((clickedPixel) => 
  {clickedPixel.addEventListener('click', paintPixel) } );
}
createPixel(lines, 5);

function deselectColor() {
  document.querySelector('.selected').classList.remove('selected');
}
function selectColor(event) {
  deselectColor();
  event.target.classList.add('selected');
}

document.querySelectorAll('.color').forEach((clicked) => 
{clicked.addEventListener('click', selectColor) } );

function paintPixel(event) {
  let color = document.querySelector(".selected").style.backgroundColor;
  event.target.style.background = color;
}

let button = document.querySelector('#clear-board');
button.addEventListener('click', clearPixels);


function generateColors () {
  const color = 'rgb'+ '(' + [Math.floor(Math.random() * 256) +1] + ', ' + [Math.floor(Math.random() * 256) +1] + ', ' + [Math.floor(Math.random() * 256) +1] + ')';
  return color;
}

color1.style.background = 'black';
color2.style.background = generateColors();
color3.style.background = generateColors();
color4.style.background = generateColors();

function clearPixels(event) {
let pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => 
  {pixel.style.background = 'white' });
}