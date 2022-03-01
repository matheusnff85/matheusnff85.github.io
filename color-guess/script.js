const color1 = document.querySelector('.color1');
const color2 = document.querySelector('.color2');
const color3 = document.querySelector('.color3');
const color4 = document.querySelector('.color4');
const color5 = document.querySelector('.color5');
const color6 = document.querySelector('.color6');
const correct = document.querySelector('#rgb-color');
const colors = document.querySelectorAll('.ball');
const answer = document.querySelector('#answer');
const resetBtn = document.querySelector('#reset-game');
const score = document.querySelector('#score');
let pontos = 0;

function generateColors() {
  const color = `${'rgb('}${[Math.floor(Math.random() * 256) + 1]}, 
  ${[Math.floor(Math.random() * 256) + 1]}, ${[Math.floor(Math.random() * 256) + 1]})`;
  return color;
}

function pickColor() {
  const pickedColor = `color${[Math.floor(Math.random() * 6) + 1]}`;
  return pickedColor;
}

function correctColor() {
  const cor = pickColor();
  const seletor = document.querySelector(`.${cor}`);
  const valor = seletor.style.background;
  return valor;
}

function selectColor(event) {
  const clicked = event.target;
  const verificator1 = clicked.style.background;
  const verificador2 = correct.innerHTML;
  clicked.classList.add('selected');
  if (verificator1 === verificador2) {
    answer.innerHTML = 'Acertou!';
    score.innerHTML = `Placar: ${pontos += 3}`;
  } else {
    answer.innerHTML = 'Errou! Tente novamente!';
  }
}

colors.forEach((clickedColor) => { clickedColor.addEventListener('click', selectColor); });

function generateGame() {
  color1.style.background = generateColors();
  color2.style.background = generateColors();
  color3.style.background = generateColors();
  color4.style.background = generateColors();
  color5.style.background = generateColors();
  color6.style.background = generateColors();
  correct.innerHTML = correctColor();
  score.innerHTML = `Placar: ${pontos}`;
}

generateGame();

function resetGame() {
  for (let index = 0; index < colors.length; index += 1) {
    if (colors[index].classList.contains('selected')) {
      colors[index].classList.remove('selected');
    }
  }
  generateGame();
  answer.innerHTML = 'Escolha uma cor';
}

resetBtn.addEventListener('click', resetGame);
