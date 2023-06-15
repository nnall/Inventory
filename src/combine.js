import React from "react";
import { useState } from "react";
import CardList from "./cardlist";
import carList from "./inventory.json";

const Combine = (searchbarResults, filterResults) => {
  const [results, setResults] = useState(carList);

  return <CardList results={results} />;
};

export default Combine;

// have combine component return final 'results' component to App.js, taking in both the searchbar and filter results, comining into final results array
