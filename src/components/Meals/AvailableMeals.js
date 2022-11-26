import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

function AvailableMeals(props) {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getHTTP = async function () {
      try {
        setIsLoading(true);

        const response = await fetch(
          "https://reactmeals-97147-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
        );

        // Gaurd Clause
        if (!response.ok) {
          throw new Error(`Something went wrong (${response.status})`);
        }

        const data = await response.json();

        // Gaurd Clause
        if (!data) {
          setMealsList(<p style={{ textAlign: "center" }}>No data found.</p>);
          return;
        }

        let meals = [];

        for (const [id, obj] of Object.entries(data)) {
          meals.push({
            id,
            description: obj.description,
            name: obj.name,
            price: obj.price,
          });
        }

        setMealsList(
          meals.map((current) => (
            <MealItem
              id={current.id}
              key={current.id}
              name={current.name}
              description={current.description}
              price={current.price}
            />
          ))
        );

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setMealsList(<p style={{ textAlign: "center" }}>{err.message}</p>);
      }
    };

    getHTTP();
  }, []);

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {isLoading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : (
            mealsList
          )}
        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
