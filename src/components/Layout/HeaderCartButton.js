import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce(
    (acc, cur) => (acc += cur.amount),
    0
  );

  return (
    <button
      className={styles.button}
      onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
