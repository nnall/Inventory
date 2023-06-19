import React, { Component } from "react";
import { useState } from "react";
import CardList from "./cardlist";
import carList from "./inventory.json";
import ReactDOM from "react";
import Searchbar from "./searchbar";
import Checkbox from "./checkboxes";
import Header from "./header";
import Combine from "./combine.js";
import Filter from "./filter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  carList.forEach((car, i) => {
    car.id = i + 1;
  });

  const [results, setResults] = useState(carList);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/home">
          <CardList results={results} />
        </Route>
      </Switch>
    </Router>
  );
}
