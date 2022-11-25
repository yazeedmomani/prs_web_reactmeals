import styles from "./Cart.module.css";

import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0 && "true";

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((current) => (
        <li>{current.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onCloseClick}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button
          className={styles["button--alt"]}
          onClick={props.onCloseClick}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
