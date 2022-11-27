import styles from "./Cart.module.css";

import { useContext, useState, Fragment } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Spinner from "../UI/Spinner";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [orderClicked, setOrderClicked] = useState(false);
  const [postConfirm, setPostConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0 && "true";
  const [confirmMessage, setConfirmMessage] = useState();

  const cartItemAddHandler = function (item) {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = function (id) {
    cartCtx.removeItem(id);
  };

  const orderHandler = function () {
    setOrderClicked(true);
  };

  const cancelHandler = function () {
    setOrderClicked(false);
  };

  const confirmHandler = async function (data) {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://reactmeals-97147-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: data,
            order: cartCtx.items,
            totalAmount: cartCtx.totalAmount,
          }),
        }
      );

      // Gaurd Clause
      if (!response.ok) {
        throw new Error(`Something went wrong (${response.status})`);
      }

      setConfirmMessage(
        <span style={{ color: "#0baa20" }}>
          Order successful! Thank you for you purchase.
        </span>
      );

      cartCtx.resetCart();
      setPostConfirm(true);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setConfirmMessage(
        <span style={{ color: "#ca3e51" }}>{err.message}</span>
      );
      setPostConfirm(true);
      setIsLoading(false);
    }
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
      {isLoading && <Spinner />}
      {!isLoading && postConfirm && (
        <Fragment>
          <div className={styles.total}>{confirmMessage}</div>
          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={props.onCloseClick}>
              Close
            </button>
          </div>
        </Fragment>
      )}
      {!isLoading && orderClicked && !postConfirm && (
        <Checkout
          onCancel={cancelHandler}
          onConfirm={confirmHandler}
        />
      )}
      {!isLoading && !orderClicked && !postConfirm && (
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
