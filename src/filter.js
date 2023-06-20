import React from "react";
import { useState, useEffect } from "react";
import carList from "./inventory.json";
import Checkbox from "./checkboxes";
import json from "./inventory.json";
import Input from "./input";
import Checkboxes from "./checkboxes";
import { MDBRange } from "mdb-react-ui-kit";

// Just making the checkbox inputs..
const Filter = ({ setResults }) => {
  const makeArray = [...new Set(carList.map((car) => car.make))].sort();
  const yearArray = [...new Set(carList.map((car) => car.year))].sort();
  const colorArray = [...new Set(carList.map((car) => car.color))].sort();
  const locationArray = [...new Set(carList.map((car) => car.location))].sort();
  const downPaymentsArray = [
    ...carList.map((car) => Number(car.requireddown)),
  ].sort(function (a, b) {
    return a - b;
  });

  //   console.log(downPaymentsArray);

  const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDownPayments, setSelectedDownPayments] = useState([]);

  function setRange(array) {
    const nums = [];

    array.forEach((item) => {
      nums.push(Number(item));
    });

    const min = Math.min(...nums);
    const max = Math.max(...nums);

    return { min, max };
  }

  const { min, max } = setRange(downPaymentsArray);

  //   function changeCards(limit) {}

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
    if (field === "location") {
      const updatedLocations = selectedLocations.includes(value)
        ? selectedLocations.filter((location) => location !== value)
        : [...selectedLocations, value];
      console.log(updatedLocations);
      setSelectedLocations(updatedLocations);
    }

    if (field === "requireddown") {
      //   console.log(`${value} is the current value`);

      const updatedDownPayments = selectedDownPayments.includes(value)
        ? selectedDownPayments.filter(
            (requireddown) => Number(requireddown) <= value
          )
        : [...selectedDownPayments, value];
      setSelectedDownPayments(updatedDownPayments);
    }
  };

  useEffect(() => {
    filterResults();
  }, [
    selectedMakes,
    selectedYears,
    selectedColors,
    selectedLocations,
    selectedDownPayments,
  ]);

  const filterResults = () => {
    const results = carList.filter((car) => {
      const makeMatch =
        selectedMakes.length === 0 || selectedMakes.includes(car.make);
      const yearMatch =
        selectedYears.length === 0 || selectedYears.includes(car.year);
      const colorMatch =
        selectedColors.length === 0 || selectedColors.includes(car.color);
      const locationMatch =
        selectedLocations.length === 0 ||
        selectedLocations.includes(car.location);

      //   const downPaymentMatch =
      //     selectedDownPayments.length === 0 ||
      //     selectedDownPayments.includes(Number(car.requireddown));

      //   const downPaymentMatch =
      //     selectedDownPayments.length === 0 ||
      //     selectedDownPayments.includes(Number(car.requireddown)) ||
      //     (selectedDownPayments.length === 1 &&
      //       Number(car.requireddown) <= selectedDownPayments[0]); // Updated condition

      const downPaymentMatch =
        selectedDownPayments.length === 0 ||
        selectedDownPayments.some(
          (downPayment) => Number(downPayment) >= Number(car.requireddown)
        );
      console.log(downPaymentMatch);

      return (
        makeMatch &&
        yearMatch &&
        colorMatch &&
        locationMatch &&
        downPaymentMatch
      );
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

      {/* DOWN PAYMENT MIN-MAX SLIDER */}

      {/* need another functino up top for inputting the range minimum and maximum according to what the min and max of the downPaymentsArray are.  */}

      <div className="filter-type">
        <h4>Down Payment</h4>
        <MDBRange
          min={min}
          max={max}
          defaultValue={max}
          id="customRange"
          label="Down Payment"
          onChange={(e) => {
            const limit = Number(e.target.value);
            // console.log(limit);
            // changeCards(limit)
            handleChange("requireddown", limit);
            // send e.target.value to function , to return from inventory only those cars whose .requireddown field had a number e.target.value or less.
          }}
        />
      </div>

      <div className="filter-type">
        <h4>Location</h4>
        <div className="filters">
          {locationArray.map((location, id) => (
            <div key={location} className="checkboxes">
              <input
                id={location}
                value={location}
                type="checkbox"
                onChange={(e) => {
                  handleChange("location", e.target.value);
                  //   console.log(e);
                  console.log(`${location} was checked`);
                }}
              ></input>
              <label htmlFor={location}>{location}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
