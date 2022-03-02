const inputText = document.querySelector('#text-input');
const memeText = document.querySelector('#meme-text');
const imageInsert = document.querySelector('#meme-insert');
const imgElement = document.querySelector('#meme-image');
const fireBtn = document.querySelector('#fire');
const waterBtn = document.querySelector('#water');
const earthBtn = document.querySelector('#earth');
const imageContainer = document.querySelector('#meme-image-container');
const presets = document.querySelectorAll('.preset');

function generateText() {
  const text = inputText.value;
  memeText.innerHTML = text;
}

function generateImage(event) {
  const image = event.target.files[0];
  imgElement.src = URL.createObjectURL(image);
  imgElement.style.width = '600px';
  imgElement.style.height = '650px';
}

function fireButton() {
  imageContainer.style.border = '3px dashed red';
}

function waterButton() {
  imageContainer.style.border = '5px double blue';
}

function earthButton() {
  imageContainer.style.border = '6px groove green';
}

function usePreset(event) {
  const clicked = event.target;
  imgElement.src = clicked.src;
  imgElement.style.width = '600px';
  imgElement.style.height = '650px';
}

window.onload = function () {
  imageInsert.addEventListener('change', generateImage);
  inputText.addEventListener('input', generateText);
  fireBtn.addEventListener('click', fireButton);
  waterBtn.addEventListener('click', waterButton);
  earthBtn.addEventListener('click', earthButton);
  presets.forEach((clickedImg) => { clickedImg.addEventListener('click', usePreset); });
};
