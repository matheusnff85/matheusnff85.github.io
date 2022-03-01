const text = document.querySelector('#texto-tarefa');
const list = document.querySelector('#lista-tarefas');
const createButton = document.querySelector('#criar-tarefa');
const clearButton = document.querySelector('#apaga-tudo');
const clearCompletedButton = document.querySelector('#remover-finalizados');

function paintItem(event) {
  const markeds = document.querySelectorAll('.marked');
  const clicked = event.target;
  for (let index of markeds) {
    if (clicked.classList.contains('completed')) {
      clicked.className = 'list-item completed';
    }
    else if (!clicked.classList.contains('completed')) {
      index.classList.remove('marked');
    }
  }
  event.target.classList.add('marked');
}

function createItem(param1) {
  const listItens = document.querySelectorAll('.list-item').length;
  if (listItens < 50) {
    const newLi = document.createElement('li');
    newLi.innerText = param1;
    newLi.classList.add('list-item');
    list.appendChild(newLi);
    text.value = '';
    const itens = document.querySelectorAll('.list-item');
    itens.forEach((clicked) => { clicked.addEventListener('click', paintItem) });
    itens.forEach((clicked) => { clicked.addEventListener('dblclick', lineThroughItem) });
  } else {
      window.alert('limite maximo de itens atingido');
  }
}
function guardText() {
  const typed = text.value;
  return createItem(typed);
}
createButton.addEventListener('click', guardText);

function lineThroughItem(event) {
  const completed = event.target;
  if (!completed.classList.contains('completed')) {
    completed.classList.add('completed');
  }
  else if (completed.classList.contains('completed')) {
    completed.classList.remove('completed');
  }
}

function clearList() {
  const childs = document.querySelectorAll('li');
  for (const index of childs) {
    index.remove();
  }
}

clearButton.addEventListener('click', clearList);

function clearCompleted() {
  const completeds = document.querySelectorAll('.completed');
  for (const index of completeds) {
    index.remove();
  }
}

clearCompletedButton.addEventListener('click', clearCompleted);

function saveList() {
  let text = [];
  let classes = [];
  let itens = document.querySelectorAll('li');
  for (let index of itens) {
    text.push(index.innerText);
    classes.push(index.className);
  }
  localStorage.setItem('savedList', JSON.stringify(text));
  localStorage.setItem('savedClasses', JSON.stringify(classes));
  window.alert('Lista salva com sucesso!')
}

function recoverySavedList() {
  if (localStorage.getItem('savedList') === null) {
    return
  }
  else {
    const text = JSON.parse(localStorage.getItem('savedList'))
    const classes = JSON.parse(localStorage.getItem('savedClasses'))
    for (let index = 0; index < text.length; index += 1) {
      let iten = document.createElement('li')
      iten.innerText = text[index]
      iten.className = classes[index]
      list.appendChild(iten)
      const itens = document.querySelectorAll('.list-item');
      itens.forEach((clicked) => { clicked.addEventListener('click', paintItem) });
      itens.forEach((clicked) => { clicked.addEventListener('dblclick', lineThroughItem) });
    }
  }
}
recoverySavedList();

// as funções de moveUp e moveDown usei como base o codigo felipe(https://github.com/tryber/sd-020-b-project-todo-list/pull/42/files) pois estava com problema para consertar alguns erros.

function moveUp() {
  let itens = document.querySelectorAll('.list-item')
  let position = 0;
  let text = '';
  let classes = '';
  if (itens.length <= 1 || itens[0].classList.contains('marked')){
    return window.alert('impossivel mover para cima')
  }
  else {
    for (let index = 0; index < itens.length; index += 1){
      if (itens[index].classList.contains('marked')){
        text = itens[index].innerHTML;
        classes = itens[index].className;
        position = index;
      }
    }
    if (text === '') {
      return window.alert('impossivel mover para cima');
    }
    else {
      itens[position].innerHTML = itens[position-1].innerHTML
      itens[position].className = itens[position-1].className
      itens[position-1].innerHTML = text
      itens[position-1].className = classes
    }
  }
}

function moveDown() {
  let itens = document.querySelectorAll('.list-item');
  let position = 0;
  let text = '';
  let classes = '';
  if (itens.length <= 1 || itens[itens.length-1].classList.contains('marked')){
    return window.alert('impossivel mover para baixo');
  }
  else {
    for (let index = 0; index < itens.length; index += 1){
      if (itens[index].classList.contains('marked')){
        text = itens[index].innerHTML;
        classes = itens[index].className;
        position = index;
      }
    }
    if (text === '') {
      return window.alert('impossivel mover para baixo');
    }
    else {
      itens[position].innerHTML = itens[position+1].innerHTML
      itens[position].className = itens[position+1].className
      itens[position+1].innerHTML = text
      itens[position+1].className = classes
    }
  }
}

function removeSelected() {
  const itens = document.querySelectorAll('.list-item')
  for (let index of itens) {
    if (index.classList.contains('marked')) {
      index.remove();
    }
  }
}