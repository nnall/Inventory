import React, { Component } from "react";
import { useState, useEffect } from "react";
import CardList from "./cardlist";
// import carList from "./inventory.json";
import json from "./inventory.json";
import Searchbar from "./searchbar";
import Filter from "./filter.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Checkbox from "./checkbox";

const Header = ({ setResults }) => {
  const [menu, setMenu] = useState(false);
  const [menuButtonActive, setMenuButtonActive] = useState(false);
  const [carList, setCarList] = useState([]);

  carList.forEach((car, i) => {
    car.id = i + 1;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl =
    "http://localhost:8080/https://holmesmotors.com/api/inventory/feed?key=hs78ki34ERs";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCarList(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleMenuClick = () => {
    setMenu((prevState) => !prevState);
    setMenuButtonActive((prevState) => !prevState);
  };

  const menuButtonStyle = {
    transform: menu || menuButtonActive ? "scale(1.1)" : "scale(1)",
    backgroundColor: menu || menuButtonActive ? "var(--LightestBG)" : "initial",
  };

  return (
    <>
      <header>
        <img src="./img/HMLogo.jpeg" alt="logo" />
        {/* <h1>Inventory Search</h1> */}
        <div className="filter-container">
          <div
            className={`menu-trigger ${menuButtonActive ? "active" : ""}`}
            onClick={handleMenuClick}
          >
            <button
              className="menu-btn"
              style={menuButtonStyle}
              onMouseEnter={() => setMenuButtonActive(true)}
              onMouseLeave={() => setMenuButtonActive(false)}
            ></button>
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
