import React, { Component } from "react";
import { useState, useEffect } from "react";
import CardList from "./cardlist";
// import carList from "./inventory.json";
import ReactDOM from "react";
import Searchbar from "./searchbar";
import Checkbox from "./checkboxes";
import Header from "./header";
import Filter from "./filter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; //why is this underlined, its been added in package.json
import Car from "./car.js";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl =
    "http://localhost:8080/https://holmesmotors.com/api/inventory/feed?key=hs78ki34ERs";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const carList = await response.json();

      carList.forEach((car, i) => {
        car.id = i + 1;
      });

      setResults(carList); // Set the fetched data to the 'results' state
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <Router>
      <Header setResults={setResults} />
      <Switch>
        <Route path="/home">
          <CardList results={results} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
