require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fecthProducts é uma função' , () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Testa se a função quando chamada com o parametro "computador" ela é executada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se ao chamar a função FetchProducts o fetch executa com o endpoint correto', async () => {
    expect.assertions(1);
    const query = 'computador';
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    await fetchProducts(query);
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Testa se o objeto retornado da função FetchProducts é igual ao esperado', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador')
    expect(result).toEqual(computadorSearch);
  });
  it('Testa se ao chamar a função FetchProducts sem um argumento ela retorna um erro', async () => {
    try {
      await fetchProducts();
    } catch(error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  });
});
