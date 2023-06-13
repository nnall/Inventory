import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  const [input, setInput] = useState("");

  //   const fetchData = function (value) {
  //     fetch("./inventory.JSON")
  //       .then((res) => res.json())
  //       .then((json) => {
  //         console.log(json);
  //       });
  //   .then((data) => console.log(data));

  // fetch("./inventory.json").then((res) => {

  // //   if (!res.ok) {
  // //     console.log("res was not okay");
  // //   } else {
  // //     console.log("res was okay");
  // //     console.log(res.json());
  // //   }
  // });

  fetch("./inventory.json")
    .then((response) => response.json())
    .then((data) => {
      // Process the JSON data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });

  const handleChange = function (val) {
    setInput(val);
    // fetchData(val);
  };

  return (
    <div className="search-bar-container">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        {/* storing input into 'value' each time a "change" is detected */}
        <input
          type="text"
          placeholder="Type to search..."
          value={input}
          onChange={(e) => {
            console.log(e.target.value);
            handleChange(e.target.value);
          }}
        />
      </div>
      <div>Search Results</div>
    </div>
  );
};
export default Searchbar;
