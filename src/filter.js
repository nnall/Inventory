import React from "react";
import { useState } from "react";
import carList from "./inventory.json";
import Checkbox from "./checkboxes";
import json from "./inventory.json";
import Input from "./input";
import Checkboxes from "./checkboxes";

let makeArray = carList.map((car) => car.make);
makeArray = [...new Set(makeArray)].sort();

let yearArray = carList.map((car) => car.year);
yearArray = [...new Set(yearArray)].sort();

let colorArray = carList.map((car) => car.color);
colorArray = [...new Set(colorArray)].sort();

// console.log(makeArray, yearArray, colorArray);

// Just making the checkbox inputs..
const Filter = ({ setResults }) => {
  const [[input, setInput]] = useState([]);

  const fetchData = (value) => {
    const results = json.filter((car) => {
      if (car.make.toLowerCase().includes(value.toLowerCase())) {
        return car;
      }
    });

    setResults(results);
  };

  //   need a way to pass what type of value it is.. so that we only search on the relevant fields.

  const handleChange = function (val) {
    // console.log(val);
    fetchData(val);
  };

  return (
    <div className="filters-container">
      <div className="filter-type">
        <h4>Make</h4>
        <div>
          {makeArray.map((make) => (
            <>
              <input
                for={make}
                type="checkbox"
                onChange={(e) => {
                  handleChange(make);
                  console.log(e);
                  //   console.log(`${make} was checked`);
                }}
              ></input>
              <label for={make}>{make}</label>
            </>
          ))}
        </div>
      </div>
      <div className="filter-type">
        <h4>Year</h4>
        <div>
          {yearArray.map((year) => (
            <>
              <input
                for={year}
                type="checkbox"
                onChange={(e) => {
                  //   console.log(e);
                  //   console.log(`${year} was checked`);
                }}
              ></input>
              <label for={year}>{year}</label>
            </>
          ))}
        </div>
      </div>
      <div className="filter-type">
        <h4>Color</h4>
        <div>
          {colorArray.map((color) => (
            <>
              <input
                for={color}
                type="checkbox"
                onChange={(e) => {
                  //   console.log(e);
                  //   console.log(`${color} was checked`);
                }}
              ></input>
              <label for={color}>{color}</label>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

// const Filter(){

//     return (
//         <div className = "filters-container">

//         </div>
//     )
// }

export default Filter;
