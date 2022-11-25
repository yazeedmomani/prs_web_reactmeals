import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = function (state, action) {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartContextProvider = function (props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemsToCartHandler = function (item) {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemsFromCartHandler = function (id) {};

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
