const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Testa se ao executar saveCartItems com o argumento "<ol><li>Item</li></ol>" o metodo localStorage.setItem é executado', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it('Testa se ao executar saveCartItems com o argumento "<ol><li>Item</li></ol>" o metodo localstage.set é executado com dois parametros sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })
});
