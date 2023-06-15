import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import json from "./inventory.json";

// console.log(json);

const Searchbar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    // if (!value) {

    // }

    // console.log(`fetch received ${value}`);

    const results = json.filter((car) => {
      if (car.model.toLowerCase().includes(value.toLowerCase())) {
        // matches.push(car);
        // matches.push(car);
        return car;
        // setResults(results);
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
          placeholder="search models.."
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
