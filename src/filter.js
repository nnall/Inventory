import React from "react";
import { useState, useEffect } from "react";
import carList from "./inventory.json";
import Checkbox from "./checkboxes";
import json from "./inventory.json";
import Input from "./input";
import Checkboxes from "./checkboxes";

// Just making the checkbox inputs..
const Filter = ({ setResults }) => {
  const makeArray = [...new Set(carList.map((car) => car.make))].sort();
  const yearArray = [...new Set(carList.map((car) => car.year))].sort();
  const colorArray = [...new Set(carList.map((car) => car.color))].sort();

  const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const handleChange = (field, value) => {
    if (field === "make") {
      const updatedMakes = selectedMakes.includes(value)
        ? selectedMakes.filter((make) => make !== value)
        : [...selectedMakes, value];
      setSelectedMakes(updatedMakes);
    }
    if (field === "year") {
      const updatedYears = selectedYears.includes(value)
        ? selectedYears.filter((year) => year !== value)
        : [...selectedYears, value];
      setSelectedYears(updatedYears);
    }
    if (field === "color") {
      const updatedColors = selectedColors.includes(value)
        ? selectedColors.filter((color) => color !== value)
        : [...selectedColors, value];
      setSelectedColors(updatedColors);
    }
  };

  useEffect(() => {
    filterResults();
  }, [selectedMakes, selectedYears, selectedColors]);

  const filterResults = () => {
    const results = carList.filter((car) => {
      const makeMatch =
        selectedMakes.length === 0 || selectedMakes.includes(car.make);
      const yearMatch =
        selectedYears.length === 0 || selectedYears.includes(car.year);
      const colorMatch =
        selectedColors.length === 0 || selectedColors.includes(car.color);
      return makeMatch && yearMatch && colorMatch;
    });
    setResults(results);
  };

  return (
    <div className="filters-container">
      <div className="filter-type">
        <h4>Make</h4>
        <div className="filters">
          {makeArray.map((make, id) => (
            <div key={make} className="checkboxes">
              <input
                id={make}
                value={make}
                type="checkbox"
                // value={input}
                onChange={(e) => {
                  handleChange("make", e.target.value);

                  console.log(e.target.value);
                  console.log(`${make} was checked`);
                }}
              ></input>
              <label htmlFor={make}>{make}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-type">
        <h4>Year</h4>
        <div className="filters">
          {yearArray.map((year, id) => (
            <div key={year} className="checkboxes">
              <input
                id={year}
                value={year}
                type="checkbox"
                onChange={(e) => {
                  handleChange("year", e.target.value);
                  //   console.log(e);
                  console.log(`${year} was checked`);
                }}
              ></input>
              <label htmlFor={year}>{year}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-type">
        <h4>Color</h4>
        <div className="filters">
          {colorArray.map((color, id) => (
            <div key={color} className="checkboxes">
              <input
                id={color}
                value={color}
                type="checkbox"
                onChange={(e) => {
                  handleChange("color", e.target.value);
                  //   console.log(e);
                  console.log(`${color} was checked`);
                }}
              ></input>
              <label htmlFor={color}>{color}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
