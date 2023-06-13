import React from "react";
import ReactDom from "react-dom";

// import

const card = (props) => {
  return (
    <article className="card">
      <h3>{`${props.year} ${props.make} ${props.model}`}</h3>
      <p>{props.retailprice}</p>
      <img src={props.photo}></img>
      <p>{props.color}</p>
    </article>
  );
};

export default card;

// set up App.js
