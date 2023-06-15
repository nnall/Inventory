import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import json from "./inventory.json";

// console.log(json);

const Searchbar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    const results = json.filter((car) => {
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

    //   need to fetch inventory.json so that handleChange can search the json for the search results
  };

  const handleChange = function (val) {
    setInput(val);
    fetchData(val);
  };

  return (
    <div className="search-bar-container">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        {/* storing input into 'value' each time a "change" is detected */}
        <input
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
