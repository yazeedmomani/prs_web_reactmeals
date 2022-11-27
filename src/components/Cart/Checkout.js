import styles from "./Checkout.module.css";
import { useRef, useReducer } from "react";

const isEmpty = (ref) => ref.current.value.trim().length === 0;
const isShort = (ref) => ref.current.value.trim().length < 5;
const isValidInitials = {
  name: true,
  street: true,
  postal: true,
  city: true,
};
const isValidReducer = function (state, action) {
  if (action.type === "CONFIRM") {
    return {
      name: action.name,
      street: action.street,
      postal: action.postal,
      city: action.city,
    };
  }
  return isValidInitials;
};

const Checkout = (props) => {
  const [isValid, dispatch] = useReducer(isValidReducer, isValidInitials);
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const isFormValid =
      !isEmpty(nameRef) &&
      !isEmpty(streetRef) &&
      !isShort(postalRef) &&
      !isEmpty(cityRef);

    if (!isFormValid) {
      dispatch({
        type: "CONFIRM",
        name: !isEmpty(nameRef),
        street: !isEmpty(streetRef),
        postal: !isShort(postalRef),
        city: !isEmpty(cityRef),
      });
      return;
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={confirmHandler}>
      <div className={styles.dist}>
        <div className={`${styles.control} ${isValid.name || styles.invalid}`}>
          <label htmlFor="name">Your Name</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            placeholder={isValid.name ? "John" : "Please enter a valid name"}
          />
        </div>
        <div
          className={`${styles.control} ${isValid.street || styles.invalid}`}>
          <label htmlFor="street">Street</label>
          <input
            ref={streetRef}
            type="text"
            id="street"
            placeholder={
              isValid.street ? "example street" : "Please enter a valid street"
            }
          />
        </div>
      </div>
      <div className={styles.dist}>
        <div
          className={`${styles.control} ${isValid.postal || styles.invalid}`}>
          <label htmlFor="postal">Postal Code</label>
          <input
            ref={postalRef}
            type="text"
            id="postal"
            placeholder={
              isValid.postal ? "12345" : "Please enter a valid postal code"
            }
          />
        </div>
        <div className={`${styles.control} ${isValid.city || styles.invalid}`}>
          <label htmlFor="city">City</label>
          <input
            ref={cityRef}
            type="text"
            id="city"
            placeholder={isValid.city ? "London" : "Please enter a valid city"}
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
