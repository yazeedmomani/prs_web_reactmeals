import styles from "./Checkout.module.css";
import { useRef, useReducer, useState, useEffect } from "react";
import { getByDisplayValue } from "@testing-library/react";

const isEmpty = (item) => item.value.trim().length === 0;
const isShort = (item) => item.value.trim().length < 5;
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

  if (action.type === "BLUR") {
    let updated = state;
    for (const [key, val] of Object.entries(action)) {
      if (key === "type") continue;
      updated[key] = val;
    }
    return updated;
  }

  if (action.type === "RESET") {
    return {
      name: true,
      street: true,
      postal: true,
      city: true,
    };
  }

  return isValidInitials;
};

const Checkout = (props) => {
  // Changing it's state makes react rerender this component
  const [_, setRender] = useState(false);
  const [isValid, dispatch] = useReducer(isValidReducer, isValidInitials);
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  //Reset
  useEffect(() => {
    dispatch({
      type: "RESET",
    });
    setRender((prev) => !prev);
  }, []);

  // Validate on submit
  const confirmHandler = (event) => {
    event.preventDefault();

    const isFormValid =
      !isEmpty(nameRef.current) &&
      !isEmpty(streetRef.current) &&
      !isShort(postalRef.current) &&
      !isEmpty(cityRef.current);

    if (!isFormValid) {
      dispatch({
        type: "CONFIRM",
        name: !isEmpty(nameRef.current),
        street: !isEmpty(streetRef.current),
        postal: !isShort(postalRef.current),
        city: !isEmpty(cityRef.current),
      });
      return;
    }
  };

  // Validate on blur
  const blurHandler = function (e) {
    dispatch({
      type: "BLUR",
      [e.target.id]:
        e.target.id === "postal" ? !isShort(e.target) : !isEmpty(e.target),
    });

    setRender((prev) => !prev);
    return;
  };

  // Validate on keystroke
  const changeHandler = function (e) {
    if (isValid[e.target.id]) return;

    dispatch({
      type: "BLUR",
      [e.target.id]:
        e.target.id === "postal" ? !isShort(e.target) : !isEmpty(e.target),
    });

    setRender((prev) => !prev);
    return;
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
            onBlur={blurHandler}
            onChange={changeHandler}
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
            onBlur={blurHandler}
            onChange={changeHandler}
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
            onBlur={blurHandler}
            onChange={changeHandler}
          />
        </div>
        <div className={`${styles.control} ${isValid.city || styles.invalid}`}>
          <label htmlFor="city">City</label>
          <input
            ref={cityRef}
            type="text"
            id="city"
            placeholder={isValid.city ? "London" : "Please enter a valid city"}
            onBlur={blurHandler}
            onChange={changeHandler}
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
