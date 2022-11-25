import styles from "./MealItemForm.module.css";

import { useRef } from "react";
import Input from "../../UI/Input";

function MealItemForm(props) {
  const inputRef = useRef();

  const submitHandler = function (e) {
    e.preventDefault();
    const amount = Number(inputRef.current.value);

    props.onAddItem(amount);
  };

  return (
    <form
      className={styles.form}
      onSubmit={submitHandler}>
      <Input
        label="Quantity"
        ref={inputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
}

export default MealItemForm;
