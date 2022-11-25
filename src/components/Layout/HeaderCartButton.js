import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  const [animateBtn, setAnimateBtn] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce(
    (acc, cur) => (acc += cur.amount),
    0
  );

  const btnClasses = `${styles.button} ${animateBtn ? styles.bump : ""}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) return;
    setAnimateBtn(true);
    const timer = setTimeout(() => setAnimateBtn(false), 300);

    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  return (
    <button
      className={btnClasses}
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
