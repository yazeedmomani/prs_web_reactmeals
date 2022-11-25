import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImg from "../../assets/meals.jpg";

import styles from "./Header.module.css";

function Header(props) {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
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
