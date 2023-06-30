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
// import fs from "fs";
import fs from "fs";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // http://localhost:8080/

  const apiUrl =
    "http://localhost:8080/https://holmesmotors.com/api/inventory/feed?key=hs78ki34ERs";

  const localJsonFilePath = "./inventory.json";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const carList = await response.json();

      console.log(carList);

      carList.forEach((car, i) => {
        car.id = i + 1;
      });

      setResults(carList); // Set the fetched data to the 'results' state

      fs.writeFile(localJsonFilePath, JSON.stringify(carList), (error) => {
        if (error) {
          console.log("Error writing data to file:", error);
        } else {
          console.log("Data written to file:", localJsonFilePath);
        }
      });

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
