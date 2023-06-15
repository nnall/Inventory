import React from "react";
import { useState } from "react";
import carList from "./inventory.json";

let makeArray = carList.map((car) => car.make);
makeArray = [...new Set(makeArray)];

const Filter = () => {
  const [filterResults, setFilter] = useState(carList);

  return (
    <div className="filters" filterResults={setFilter}>
      <div>
        <caption>Make</caption>

        <input
          type="checkbox"
          value="make" /*onChange={handleChange} checked={checked}*/
        />
        <label>Make</label>
      </div>
      <div>
        <label></label>
        <input type="checkbox" /*onChange={handleChange} checked={checked}*/ />
      </div>
      <div>
        <label></label>
        <input type="checkbox" /*onChange={handleChange} checked={checked}*/ />
      </div>
      <div>
        <label></label>
        <input type="checkbox" /*onChange={handleChange} checked={checked}*/ />
      </div>
    </div>
  );
};

export default Filter;
