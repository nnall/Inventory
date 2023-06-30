import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import inventory from "./inventory.json";

const Searchbar = ({ setResults }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchCarList(input);
  }, [input]);

  const fetchCarList = /*async*/ (value) => {
    // console.log(inventory);
    // const carList = await response.json();
    const results = inventory.filter((car) => {
      if (
        car.model.toLowerCase().includes(value.toLowerCase()) ||
        car.year.toLowerCase().includes(value.toLowerCase()) ||
        car.make.toLowerCase().includes(value.toLowerCase()) ||
        car.color.toLowerCase().includes(value.toLowerCase())
      ) {
        // console.log(results);

        return car;
      }
    });
    setResults(results);
  };

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
