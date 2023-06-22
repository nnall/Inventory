import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

// import carList from "./inventory.json";

const Searchbar = ({ setResults }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchCarList(input);
  }, [input]);

  const fetchCarList = async (value) => {
    try {
      const response = await fetch(
        "http://localhost:8080/https://holmesmotors.com/api/inventory/feed?key=hs78ki34ERs"
      );
      if (response.ok) {
        const carList = await response.json();
        const results = carList.filter((car) => {
          if (
            car.model.toLowerCase().includes(value.toLowerCase()) ||
            car.year.toLowerCase().includes(value.toLowerCase()) ||
            car.make.toLowerCase().includes(value.toLowerCase()) ||
            car.color.toLowerCase().includes(value.toLowerCase())
          ) {
            return car;
          }
        });
        setResults(results);
      } else {
        console.error("Error fetching car data:", response.status);
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
      setResults([]);
    }
  };

  // const fetchData = (value) => {
  //   const results = carList.filter((car) => {
  //     if (
  //       car.model.toLowerCase().includes(value.toLowerCase()) ||
  //       car.year.toLowerCase().includes(value.toLowerCase()) ||
  //       car.make.toLowerCase().includes(value.toLowerCase()) ||
  //       car.color.toLowerCase().includes(value.toLowerCase())
  //     ) {
  //       return car;
  //     }
  //   });

  //   setResults(results);

  //   //   need to fetch inventory.json so that handleChange can search the json for the search results
  // };

  const handleChange = function (val) {
    setInput(val);
    fetchCarList(val);
  };

  return (
    <div className="search-bar-container">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        {/* storing input into 'value' each time a "change" is detected */}
        <input
          id="searchInput"
          type="text"
          placeholder="search year, make, model.. "
          value={input}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Searchbar;
