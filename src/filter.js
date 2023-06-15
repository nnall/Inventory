import React from "react";
import { useState } from "react";
import carList from "./inventory.json";
import Checkbox from "./checkbox";

let makeArray = carList.map((car) => car.make);
makeArray = [...new Set(makeArray)];

let yearArray = carList.map((car) => car.year);
yearArray = [...new Set(yearArray)];

let colorArray = carList.map((car) => car.color);
colorArray = [...new Set(colorArray)];

console.log(makeArray, yearArray, colorArray);

const Filter = () => {
  //   maps over each of these arrays, and returns the <div> element below,

  // When mapping over, the <input> value field gets {value} of the current item,

  return (
    <div className="filters" /*filterResults={setFilter}*/>
      {/* MAKE */}
      <div>
        <h4 className="filterCat">Make</h4>
        <Checkbox />
      </div>
      {/* YEAR */}
      <div>
        <h4 className="filterCat">Make</h4>
        <Checkbox />
      </div>
      {/* COLOR */}
      <div>
        <h4 className="filterCat">Make</h4>
        <Checkbox />
      </div>
    </div>
  );
};

export default Filter;
