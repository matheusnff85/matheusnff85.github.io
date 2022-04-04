const cartItems = '.cart__items';
const emptyCartBtn = document.querySelector('.empty-cart');
const priceArea = document.querySelector('.total-price');
let sum = 0;

function addLoading() {
  const container = document.querySelector('.items');
  const newP = document.createElement('p');
  newP.className = 'loading';
  newP.innerHTML = 'carregando...';
  container.appendChild(newP);
}
addLoading();

function removeLoading() {
  const item = document.querySelector('.loading');
  item.remove();
}

function clearCart() {
  document.querySelectorAll(cartItems)[0].innerHTML = '';
  priceArea.innerHTML = '0.00';
  sum = 0;
  saveCartItems(document.querySelector(cartItems).innerHTML);
}

emptyCartBtn.addEventListener('click', clearCart);

function sumItem(preco) {
  sum += preco;
  priceArea.innerHTML = sum;
}

function subItem(value) {
  const number = Number(priceArea.innerHTML);
  priceArea.innerHTML = number - value;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  subItem(Number(event.target.innerText.split('$', -1)[1]));
  saveCartItems(document.querySelector(cartItems).innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = 'cart-item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function getProducts() {
  const container = document.querySelector('.items');
  const data = await fetchProducts('computador');
  data.results.forEach((element) => {
    const obj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    container.appendChild(createProductItemElement(obj));
  });
}

async function getClickedItem() {
  const buttons = document.querySelectorAll('.item__add');
  const cartContainer = document.querySelector('.cart__items');
  buttons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const id = event.target.parentElement.firstChild.innerHTML;
      const data = await fetchItem(id);
      const obj = {
        sku: data.id,
        name: data.title,
        salePrice: data.price,
      };
      cartContainer.appendChild(createCartItemElement(obj));
      sumItem(data.price);
      saveCartItems(document.querySelector(cartItems).innerHTML);
    });
  });
}

function getLocalStorageItems() {
  const cart = document.querySelector(cartItems);
  const storageItems = getSavedCartItems();
  cart.innerHTML = storageItems;
  cart.childNodes.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
}

window.onload = async () => {
  await getProducts();
  await getClickedItem();
  getLocalStorageItems();
  removeLoading();
};
