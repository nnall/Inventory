import React from "react";
import carList from "./inventory.json";
import Card from "./card";

export default function cardlist() {
  console.log("cardList component activated");

  //   console.log(carList);

  return (
    <section className="carList">
      {carList.map((car) => {
        return <Card {...car} key={car.id}></Card>;
      })}
    </section>
  );
}

// iterate over
