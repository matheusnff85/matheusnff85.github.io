const createButton = document.querySelector('#criar-carta');
const inputText = document.querySelector('#carta-texto');
const paragraph = document.querySelector('#carta-gerada');
const group1 = ['newspaper', 'magazine1', 'magazine2'];
const group2 = ['medium', 'big', 'reallybig'];
const group3 = ['rotateleft', 'rotateright'];
const group4 = ['skewleft', 'skewright'];
const counter = document.querySelector('#carta-contador');

function validateLetter() {
  const letter = inputText.value;
  if (letter === ' ' || letter === '') {
    paragraph.innerHTML = 'Por favor, digite o conteúdo da carta.';
  }
}

function generateClass(param1) {
  const elemento = param1;
  elemento.id = 'spanItem';
  elemento.className = '';
  elemento.classList.add(group1[[Math.floor(Math.random() * group1.length)]]);
  elemento.classList.add(group2[[Math.floor(Math.random() * group2.length)]]);
  elemento.classList.add(group3[[Math.floor(Math.random() * group3.length)]]);
  elemento.classList.add(group4[[Math.floor(Math.random() * group4.length)]]);
}

function addClass(param1) {
  const spanItem = document.createElement('span');
  generateClass(spanItem);
  spanItem.innerHTML = ` ${param1}`;
  paragraph.appendChild(spanItem);
}

function resetLetter() {
  const spans = document.querySelectorAll('span');
  for (let index = 0; index < spans.length; index += 1) {
    spans[index].remove();
  }
}

function classChanger(event) {
  const clicked = event.target;
  generateClass(clicked);
}

function counterUpdater(param1) {
  const number = param1.length;
  counter.innerHTML = number;
}

function createLetter() {
  validateLetter();
  resetLetter();
  const letter = inputText.value;
  const splitedLetter = letter.split(' ', letter.length);
  for (let index = 0; index < splitedLetter.length; index += 1) {
    addClass(splitedLetter[index]);
  }
  counterUpdater(splitedLetter);
  const spanItens = document.querySelectorAll('#spanItem');
  spanItens.forEach((clickedSpan) => { clickedSpan.addEventListener('click', classChanger); });
}

createButton.addEventListener('click', createLetter);
