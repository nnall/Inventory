import React from "react";
import { useState, useEffect } from "react";
// import carList from "./inventory.json";
import Checkbox from "./checkboxes";
import json from "./inventory.json";
import Input from "./input";
import Checkboxes from "./checkboxes";
import { MDBRange } from "mdb-react-ui-kit";

// Just making the checkbox inputs..
const Filter = ({ setResults }) => {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/https://holmesmotors.com/api/inventory/feed?key=hs78ki34ERs"
      );
      const data = await response.json();

      data.forEach((car, i) => {
        car.id = i + 1;
      });

      setCarList(data);
      setResults(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

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

  const [rangeSliderChanged, setRangeSliderChanged] = useState(false);

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

      setSelectedDownPayments(value);
      setRangeSliderChanged(true);
      //   const updatedDownPayments = selectedDownPayments.includes(value)
      //     ? selectedDownPayments.filter(
      //         (requireddown) => Number(requireddown) <= value
      //       )
      //     : [...selectedDownPayments, value];
      //   setSelectedDownPayments(updatedDownPayments);
    }
  };

  function locationTrans(location) {
    if (location === "S01_Holmes1") {
      return "Diberville";
    } else if (location === "S05_Montgomery1") {
      return "Montgomery";
    } else if (location === "S07_Bham1") {
      return "Birmingham";
    } else if (location === "S09_Douglas1") {
      return "Douglas";
    }
  }

  useEffect(() => {
    filterResults();
  }, [
    selectedMakes,
    selectedYears,
    selectedColors,
    selectedLocations,
    selectedDownPayments,
  ]);

  const clearFilters = () => {
    // a function to uncheck all filters, clear searchbar, reset down payment
    setSelectedMakes([]);
    setSelectedYears([]);
    setSelectedColors([]);
    setSelectedLocations([]);
    setSelectedDownPayments([]);

    document.getElementById("searchInput").value = ""; // Assuming your search input has an id of "searchInput"
    document.getElementById("customRange").value = max; // Assuming your range slider has an id of "customRange" and "max" is the maximum value
    const checkboxes = document.querySelectorAll(".checkboxes input"); // Assuming your checkboxes have a common class of "checkboxes"
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  //   const filterResults = () => {
  //     let results = [...carList];

  //     if (selectedMakes.length > 0) {
  //       results = results.filter((car) => selectedMakes.includes(car.make));
  //     }
  //     if (selectedYears.length > 0) {
  //       results = results.filter((car) => selectedYears.includes(car.year));
  //     }
  //     if (selectedColors.length > 0) {
  //       results = results.filter((car) => selectedColors.includes(car.color));
  //     }
  //     if (selectedLocations.length > 0) {
  //       results = results.filter((car) =>
  //         selectedLocations.includes(car.location)
  //       );
  //     }
  //     if (selectedDownPayments > 0) {
  //       results = results.filter(
  //         (car) => Number(car.requireddown) <= selectedDownPayments
  //       );

  //       //   const downPaymentMatch =
  //       //     selectedDownPayments.length === 0 ||
  //       //     selectedDownPayments.includes(Number(car.requireddown));

  //       //   const downPaymentMatch =
  //       //     selectedDownPayments.length === 0 ||
  //       //     selectedDownPayments.includes(Number(car.requireddown)) ||
  //       //     (selectedDownPayments.length === 1 &&
  //       //       Number(car.requireddown) <= selectedDownPayments[0]); // Updated condition

  //       //   const downPaymentMatch =
  //       //     selectedDownPayments === 0 ||
  //       //     Number(car.requireddown) <= selectedDownPayments;

  //       //   console.log(downPaymentMatch);

  //       //   console.log(downPaymentMatch);
  //     }

  //     // return (
  //     //   makeMatch && yearMatch && colorMatch && locationMatch && downPaymentMatch
  //     // );

  //     // if (rangeSliderChanged) {
  //     //   // Sort by requireddown only if range slider caused the filtering
  //     //   results.sort((a, b) => a.requireddown - b.requireddown);
  //     //   setRangeSliderChanged(false); // Reset the flag after sorting
  //     // }

  //     setResults(results);
  //   };

  const filterResults = () => {
    let results = [...carList]; // Create a copy of the carList array

    if (selectedMakes.length > 0) {
      results = results.filter((car) => selectedMakes.includes(car.make));
    }
    if (selectedYears.length > 0) {
      results = results.filter((car) => selectedYears.includes(car.year));
    }
    if (selectedColors.length > 0) {
      results = results.filter((car) => selectedColors.includes(car.color));
    }
    if (selectedLocations.length > 0) {
      results = results.filter((car) =>
        selectedLocations.includes(car.location)
      );
    }
    if (selectedDownPayments > 0) {
      results = results.filter(
        (car) => Number(car.requireddown) <= selectedDownPayments
      );
      results.sort((a, b) => a.requireddown - b.requireddown);
    }

    setResults(results);
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

      <div className="filter-type">
        <h4>Down Payment</h4>
        <MDBRange
          min={min}
          max={max}
          defaultValue={max}
          id="customRange"
          onChange={(e) => {
            const limit = Number(e.target.value);
            handleChange("requireddown", limit);
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
              <label htmlFor={location}>{locationTrans(location)}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="clear-filters-button">
        <button onClick={clearFilters}>Clear Filters</button>
      </div>
    </div>
  );
};

export default Filter;
