import React, { Component } from "react";
import { useState } from "react";
import CardList from "./cardlist";
import carList from "./inventory.json";
import ReactDOM from "react";
import Searchbar from "./searchbar";
import Checkbox from "./checkbox";
import Header from "./header";

export default function App() {
  return (
    // make a component for <Header> containing everything here.
    <Header />
  );
}
