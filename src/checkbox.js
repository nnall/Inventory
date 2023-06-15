import React, { Component } from "react";
import { useState } from "react";

// Generates checkbox html from arrays

const checkbox = (array) => {
  const [filterResults, setFilter] = useState(carList);
  console.log(array);

  // receives array, outputs as checkbox

  const checkboxArray = array.map((item) => {
    React.createElement("input", { type: "checkbox" }, { item });
  });

  return <div></div>;
};

export default checkbox;
