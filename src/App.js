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
import Car from "./car.js";

// export default function App(props) {
//   carList.forEach((car, i) => {
//     car.id = i + 1;
//   });

//   const [results, setResults] = useState(carList);
//   // const [menu, setMenu] = useState(false);

//   return (

//   );
// }

const App = () => {
  carList.forEach((car, i) => {
    car.id = i + 1;
  });

  const [results, setResults] = useState(carList);

  return (
    <Router>
      <Header setResults={setResults} />
      <Switch>
        <Route path="/home">
          <CardList results={results} />
        </Route>
        <Route exact path="/car/:carID">
          <Car />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
