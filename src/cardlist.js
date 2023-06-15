import React from "react";
// import carList from "./inventory.json";
import Card from "./card";

// import SearchResults from "./searchResults"

export default function cardlist(data) {
  data = data.results;
  //   console.log(data);

  return (
    <section className="carList">
      {data.map((car) => {
        return <Card {...car} key={car.id}></Card>;
      })}
    </section>
  );
}

// iterate over
