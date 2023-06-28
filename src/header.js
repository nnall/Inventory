import React from "react";
import { useState, useEffect, useRef } from "react";
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
  const dropdownRef = useRef(null);

  const svgRef = useRef(null);

  carList.forEach((car, i) => {
    car.id = i + 1;
  });

  useEffect(() => {
    fetchData();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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

    // setMenuButtonActive(true);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.classList.contains("menu-btn") &&
      !event.target.classList.contains("menu-trigger")
    ) {
      setMenu(false);
    }
  };

  useEffect(() => {
    const handleSvgClick = (event) => {
      if (svgRef.current && svgRef.current.contains(event.target)) {
        if (menu) {
          setMenu(false);
        }
        event.stopPropagation();
        handleMenuClick();
      }
    };

    svgRef.current.addEventListener("click", handleSvgClick);

    // document.addEventListener("click", handleSvgClick);

    return () => {
      svgRef.current.removeEventListener("click", handleSvgClick);
    };
  }, []);

  const menuButtonStyle = {
    transform: menu || menuButtonActive ? "scale(1.1)" : "scale(1)",
    backgroundColor:
      menu || menuButtonActive ? "var(--HMGreen)" : "var(--Yellow)",
    fill: menu || menuButtonActive ? "white" : "var(--DarkText)",
  };

  const SVGStyle = {
    fill: menu || menuButtonActive ? "white" : "var(--DarkText)",
    strokeWidth: ".001px",
  };

  return (
    <>
      <header>
        {/* <img src="./img/logoHM.png" alt="logo" /> */}
        <img src={require("./img/logoHM.png")} />
        {/* <h1>Inventory Search</h1> */}
        <div className="filter-container">
          <div
            className={`menu-trigger ${menuButtonActive ? "active" : ""}`}
            onClick={handleMenuClick}
          >
            <button
              className="menu-btn"
              style={menuButtonStyle}
              onClick={handleMenuClick}
              onMouseEnter={() => setMenuButtonActive(true)}
              onMouseLeave={() => setMenuButtonActive(false)}
            >
              {/* <img src={require("./img/menuIcon.svg")} /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="30px"
                height="30px"
                ref={svgRef}
                style={SVGStyle}
                fontWeight="lighter"
                onClick={handleMenuClick}
              >
                <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`dropdown_menu ${menu ? "active" : "inactive"}`}
        ref={dropdownRef}
      >
        <Searchbar setResults={setResults} />
        <Filter setResults={setResults} />
      </div>

      {/* <div
        className={`dropdown_menu ${menu ? "active" : "inactive"}`}
        ref={dropdownRef}
      >
        <Searchbar setResults={setResults} />
        <Filter setResults={setResults} />
      </div> */}
    </>
  );
};

export default Header;
