import React, { Component } from "react";
import { useState } from "react";
import CardList from "./cardlist";
import carList from "./inventory.json";
import json from "./inventory.json";
import Searchbar from "./searchbar";
import Filter from "./filter.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Checkbox from "./checkbox";

const Header = () => {
  const [results, setResults] = useState(carList);
  const [menu, setMenu] = useState(false);

  carList.forEach((car, i) => {
    car.id = i + 1;
  });

  return (
    <>
      <header>
        <h1>Inventory Search</h1>
        <div className="filter-container">
          <div
            className="menu-trigger"
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <button></button>
          </div>
        </div>
      </header>

      <div className={`dropdown-menu ${menu ? "active" : "inactive"}`}>
        <Searchbar setResults={setResults} />
        <Filter setResults={setResults} />
      </div>
    </>
  );
};

export default Header;
