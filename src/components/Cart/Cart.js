import styles from "./Cart.module.css";

import { useContext, useState, Fragment } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [orderClicked, setOrderClicked] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0 && "true";

  const cartItemAddHandler = function (item) {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = function (id) {
    cartCtx.removeItem(id);
  };

  const orderHandler = function () {
    setOrderClicked(true);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((current) => (
        <CartItem
          key={current.id}
          name={current.name}
          amount={current.amount}
          price={current.price}
          onRemove={cartItemRemoveHandler.bind(null, current.id)}
          onAdd={cartItemAddHandler.bind(null, current)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onCloseClick}>
      {orderClicked && <Checkout onCancel={props.onCloseClick} />}
      {orderClicked || (
        <Fragment>
          {cartItems}
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{cartCtx.totalAmount > 0 ? totalAmount : "$0.00"}</span>
          </div>
          <div className={styles.actions}>
            <button
              className={styles["button--alt"]}
              onClick={props.onCloseClick}>
              Close
            </button>
            {hasItems && (
              <button
                className={styles.button}
                onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </Fragment>
      )}
    </Modal>
  );
}

export default Cart;
