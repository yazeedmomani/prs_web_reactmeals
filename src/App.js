import { useState, Fragment } from "react";

import Header from "./components/Layout//Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = function () {
    setCartIsShown(true);
  };

  const hideCartHandler = function () {
    setCartIsShown(false);
  };

  return (
    <CartContextProvider>
      {cartIsShown && <Cart onCloseClick={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
