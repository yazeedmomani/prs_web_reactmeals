import { Fragment } from "react";
import mealsImg from "../../assets/meals.jpg";
import styles from "./Header.module.css";

function Header(props) {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div className={styles["main-image"]}>
        <img
          src={mealsImg}
          alt="A table full of delicious food!"
        />
      </div>
    </Fragment>
  );
}

export default Header;
