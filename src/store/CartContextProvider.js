import CartContext from "./cart-context";

const CartContextProvider = function (props) {
  const addItemsToCartHandler = function (item) {};

  const removeItemsFromCartHandler = function (id) {};

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemsToCartHandler,
    removeItem: removeItemsFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
