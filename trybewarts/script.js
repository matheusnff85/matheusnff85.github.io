const main = document.querySelector('main');
const inputEmail = document.querySelector('.email');
const inputSenha = document.querySelector('.senha');
const btnLogin = document.querySelector('#btn-login');
const agreement = document.querySelector('#agreement');
const btnSubmit = document.querySelector('#submit-btn');
const textarea = document.querySelector('#textarea');
const counter = document.querySelector('#counter');
const form = document.querySelector('#evaluation-form');
const firstName = document.querySelector('#input-name');
const lastName = document.querySelector('#input-lastname');
const email = document.querySelector('#input-email');
const house = document.querySelector('#house');
const family = document.querySelectorAll('input[name="family"]');
const content = document.querySelectorAll('input[name="content"]');
const rate = document.querySelectorAll('input[name="rate"]');
counter.innerHTML = 500;

function validate() {
  if (inputEmail.value === 'tryber@teste.com' && inputSenha.value === '123456') {
    window.alert('Olá, Tryber!');
  } else {
    window.alert('Email ou senha inválidos.');
  }
}

btnLogin.addEventListener('click', validate);

function btnStatus() {
  if (agreement.checked) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
}

agreement.addEventListener('click', btnStatus);

function lengthCounter(event) {
  const target = event.currentTarget;
  const maxLength = target.getAttribute('maxlength');
  const currentLength = target.value.length;

  if (currentLength >= maxLength) {
    counter.innerHTML = 0;
  }
  counter.innerHTML = maxLength - currentLength;
}

textarea.addEventListener('input', lengthCounter);

function returnCheckeds(array) {
  let text = '';
  for (let index = 0; index < array.length; index += 1) {
    const inputs = array[index];
    if (inputs.checked) {
      text += `${inputs.value}, `;
    }
  }
  return text.slice(0, -2);
}

function createParagraph(text) {
  const p = document.createElement('p');
  p.innerText = text;
  return p;
}

function disableSendBtn(event) {
  event.preventDefault();
}

function sendInfos() {
  const newForm = document.querySelector('#evaluation-form');
  newForm.appendChild(createParagraph(`Nome: ${firstName.value} ${lastName.value}`));
  newForm.appendChild(createParagraph(`Email: ${email.value}`));
  newForm.appendChild(createParagraph(`Casa: ${house.value}`));
  newForm.appendChild(createParagraph(`Família: ${returnCheckeds(family)}`));
  newForm.appendChild(createParagraph(`Matérias: ${returnCheckeds(content)}`));
  newForm.appendChild(createParagraph(`Avaliação: ${returnCheckeds(rate)}`));
  newForm.appendChild(createParagraph(`Observações: ${textarea.value}`));
}

function createNewForm() {
  form.remove();
  const newForm = document.createElement('form');
  newForm.id = 'evaluation-form';
  main.appendChild(newForm);
  sendInfos();
}

btnSubmit.addEventListener('click', disableSendBtn);
btnSubmit.addEventListener('click', createNewForm);
