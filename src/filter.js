import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import { Col, Form } from "react-bootstrap";

import { MDBRange } from "mdb-react-ui-kit";
import Select from "react-select";
import inventory from "./inventory.json";

// Import the CSS styles for react-select
// import "react-select/dist/react-select.css";

// Just making the checkbox inputs..
const Filter = ({ setResults }) => {
  const [carList, setCarList] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 550);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 550);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setCarList(inventory);
    setResults(inventory);
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

  const handleChange = (field, values) => {
    if (field === "make") {
      const updatedMakes = values;
      setSelectedMakes(updatedMakes);
    }
    if (field === "year") {
      const updatedYears = values;
      setSelectedYears(updatedYears);
    }
    if (field === "color") {
      const updatedColors = values;
      setSelectedColors(updatedColors);
    }
    if (field === "location") {
      const updatedLocations = values;
      setSelectedLocations(updatedLocations);
    }

    if (field === "requireddown") {
      setSelectedDownPayments(values);
      setRangeSliderChanged(true);
    }
    // document.getElementById("react-select-6-input").focus();
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

  function numberTrans(number) {
    return (Math.round(number * 100) / 100).toFixed(2);
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

  // making multiValue elements disappear with clearFilters
  const selectMakeRef = useRef(null);
  const selectYearRef = useRef(null);
  const selectColorRef = useRef(null);
  const selectLocationRef = useRef(null);

  const clearFilters = () => {
    // a function to uncheck all filters, clear searchbar, reset down payment
    setSelectedMakes([]);
    setSelectedYears([]);
    setSelectedColors([]);
    setSelectedLocations([]);
    setSelectedDownPayments([]);

    document.getElementById("searchInput").value = ""; // Assuming your search input has an id of "searchInput"
    document.getElementById("customRange").value = max; // Assuming your range slider has an id of "customRange" and "max" is the maximum value

    const selectInputs = [
      selectMakeRef,
      selectYearRef,
      selectColorRef,
      selectLocationRef,
    ];

    const checkboxes = document.querySelectorAll(".checkboxes input"); // Assuming your checkboxes have a common class of "checkboxes"
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

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

  //  Convert makeArray to usable  object for <Select>

  const makeArraySelect = makeArray.map((value) => ({ value, label: value }));
  const yearArraySelect = yearArray.map((value) => ({ value, label: value }));
  const colorArraySelect = colorArray.map((value) => ({ value, label: value }));
  const locationArraySelect = locationArray.map((value) => ({
    value,
    label: locationTrans(value),
  }));

  // const [selectedOptions, setSelectedOptions] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // const handleMenuOpen = () => {
  //   setMenuIsOpen(true);
  // };

  // const handleMenuClose = () => {
  //   setMenuIsOpen(false);
  // };

  if (isSmallScreen) {
    return (
      <div className="mobile-filters-container">
        <Select
          // menuIsOpen={true}

          placeholder="MAKE"
          isMulti
          className="select selectMake"
          options={makeArraySelect}
          styles={{
            option: (provided, state) => ({
              ...provided,
              color: "black",
              fontSize: "1.2rem",
              ":hover": {
                backgroundColor: "#23592C",
                color: "white",
                cursor: "pointer",
              },
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: "#EDC62B",
              color: "black",
              fontWeight: "bolder",
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              backgroundColor: "rgb(62, 62, 62);",

              color: "white",
              ":hover": {
                backgroundColor: "red",
              },
            }),
            placeholder: (provided) => ({
              ...provided,
              fontWeight: "bold",
            }),
          }}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.value
            );

            handleChange("make", selectedValues);
          }}
          // onMenuOpen={}
          // onMenuClose={}
          // menuIsOpen={menuIsOpen}
        ></Select>

        <Select
          placeholder="YEAR"
          isMulti
          className="select selectYear"
          options={yearArraySelect}
          styles={{
            option: (provided, state) => ({
              ...provided,
              color: "black",
              fontSize: "1.2rem",
              ":hover": {
                backgroundColor: "#23592C",
                color: "white",
                cursor: "pointer",
              },
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: "#EDC62B",
              color: "black",
              fontWeight: "bolder",
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              backgroundColor: "rgb(62, 62, 62);",

              color: "white",
              ":hover": {
                backgroundColor: "red",
              },
            }),
            placeholder: (provided) => ({
              ...provided,
              fontWeight: "bold",
            }),
          }}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.value
            );

            console.log(selectedValues);
            handleChange("year", selectedValues);
          }}
          closeMenuOnSelect={false}
        ></Select>
        <Select
          closeMenuOnSelect={false}
          placeholder="COLOR"
          isMulti
          className="select selectColor"
          options={colorArraySelect}
          styles={{
            option: (provided, state) => ({
              ...provided,
              color: "black",
              fontSize: "1.2rem",
              ":hover": {
                backgroundColor: "#23592C",
                color: "white",
                cursor: "pointer",
              },
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: "#EDC62B",
              color: "black",
              fontWeight: "bolder",
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              backgroundColor: "rgb(62, 62, 62);",

              color: "white",
              ":hover": {
                backgroundColor: "red",
              },
            }),
            placeholder: (provided) => ({
              ...provided,
              fontWeight: "bold",
            }),
          }}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.value
            );

            // console.log(selectedValues);
            handleChange("color", selectedValues);
          }}
        ></Select>
        <Select
          closeMenuOnSelect={false}
          placeholder="LOCATION"
          isMulti
          className="select selectLocation"
          options={locationArraySelect}
          styles={{
            option: (provided, state) => ({
              ...provided,
              color: "black",
              fontSize: "1.2rem",
              // textContent: locationTrans(location),
              ":hover": {
                backgroundColor: "#23592C",
                color: "white",
                cursor: "pointer",
              },
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: "#EDC62B",
              color: "black",
              fontWeight: "bolder",
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              backgroundColor: "rgb(62, 62, 62);",
              color: "white",
              ":hover": {
                backgroundColor: "red",
              },
            }),
            placeholder: (provided) => ({
              ...provided,
              fontWeight: "bold",
            }),
          }}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.value
            );

            // console.log(selectedValues);
            handleChange("location", selectedValues);
          }}
        ></Select>

        <div className="filter-type range">
          <h4>Down Payment</h4>
          <MDBRange
            min={min}
            max={max}
            defaultValue={800}
            id="customRange"
            onChange={(e) => {
              const limit = Number(e.target.value);
              // console.log(numberTrans(limit));
              handleChange("requireddown", numberTrans(limit));
            }}
          />
        </div>
        <div className="clear-filters-button">
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>
    );
  }
  //   ELSE RETURN THIS DESKTOP VERSION OF FILTERS-CONTAINER

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
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const value = e.target.value;

                  setSelectedMakes((prevSelectedMakes) => {
                    const updatedMakes = isChecked
                      ? [...prevSelectedMakes, value]
                      : prevSelectedMakes.filter(
                          (selectedMake) => selectedMake !== value
                        );
                    handleChange("make", updatedMakes);

                    return updatedMakes;
                  });
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
                  const isChecked = e.target.checked;
                  const value = e.target.value;

                  // handleChange("year", e.target.value);
                  setSelectedYears((prevSelectedYears) => {
                    const updatedYears = isChecked
                      ? [...prevSelectedYears, value]
                      : prevSelectedYears.filter(
                          (selectedYear) => selectedYear !== value
                        );
                    handleChange("year", updatedYears);

                    return updatedYears;
                  });
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
                  const isChecked = e.target.checked;
                  const value = e.target.value;

                  // handleChange("year", e.target.value);
                  setSelectedColors((prevSelectedColors) => {
                    const updatedColors = isChecked
                      ? [...prevSelectedColors, value]
                      : prevSelectedColors.filter(
                          (selectedColor) => selectedColor !== value
                        );
                    handleChange("color", updatedColors);

                    return updatedColors;
                  });
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
          defaultValue={800}
          id="customRange"
          onChange={(e) => {
            const limit = Number(e.target.value);
            // console.log(numberTrans(limit));
            handleChange("requireddown", numberTrans(limit));
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
                  const isChecked = e.target.checked;
                  const value = e.target.value;

                  // handleChange("year", e.target.value);
                  setSelectedLocations((prevSelectedLocations) => {
                    const updatedLocations = isChecked
                      ? [...prevSelectedLocations, value]
                      : prevSelectedLocations.filter(
                          (selectedLocation) => selectedLocation !== value
                        );
                    handleChange("location", updatedLocations);

                    return updatedLocations;
                  });
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
