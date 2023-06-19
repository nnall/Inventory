import React from "react";
import ReactDom from "react-dom";

// import

const card = (props) => {
  return (
    <>
      <h3>{`${props.year} ${props.make} ${props.model}`}</h3>
      <p>{props.retailprice}</p>
      <img src={props.photo}></img>
      <p>{props.color}</p>
    </>
  );
};

export default card;

// set up App.js
