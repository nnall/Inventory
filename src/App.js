import React from "react";
import CardList from "./cardlist";
import carList from "./inventory.json";
import ReactDOM from "react";
import Searchbar from "./searchbar";

export default function App() {
  // loop over carList

  carList.forEach((car, i) => {
    car.id = i + 1;
  });

  return (
    <>
      <header>
        <h1>Inventory Search</h1>
      </header>
      <Searchbar />

      <CardList />
    </>
  );
}
