const saveCartItems = (obj) => {
  localStorage.setItem('cartItems', obj);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
