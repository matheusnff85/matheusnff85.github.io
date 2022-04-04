require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função FecthItem', () => {
  it('Testa se FecthItem é uma função' , () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Testa se a função quando chamada com o parametro "MLB1615760527" ela é executada', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se ao chamar a função fetchItem o fetch executa com o endpoint correto', async () => {
    expect.assertions(1);
    const itemId = 'MLB1615760527';
    const url = `https://api.mercadolibre.com/items/${itemId}`;
    await fetchItem(itemId);
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Testa se o objeto retornado da função fetchItem é igual ao esperado', async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527')
    expect(result).toEqual(item);
  });
  it('Testa se ao chamar a função fetchItem sem um argumento ela retorna um erro', async () => {
    try {
      await fetchItem();
    } catch(error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  });
});
