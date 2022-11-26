import styles from "./Checkout.module.css";
import { useRef } from "react";

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    console.log(nameRef.current.value);
  };

  return (
    <form
      className={styles.form}
      onSubmit={confirmHandler}>
      <div className={styles.dist}>
        <div className={styles.control}>
          <label htmlFor="name">Your Name</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="street">Street</label>
          <input
            ref={streetRef}
            type="text"
            id="street"
          />
        </div>
      </div>
      <div className={styles.dist}>
        <div className={styles.control}>
          <label htmlFor="postal">Postal Code</label>
          <input
            ref={postalRef}
            type="text"
            id="postal"
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="city">City</label>
          <input
            ref={cityRef}
            type="text"
            id="city"
          />
        </div>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
