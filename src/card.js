import React from "react";
import { Link } from "react-router-dom";
import ReactDom from "react-dom";

// import

const Card = (props) => {
  // props.stock
  return (
    <Link
      href={`https://holmesmotors.com/vehicle-details?stock=${props.stock}`}
      className="card"
    >
      <h3>{`${props.year} ${props.make} ${props.model}`}</h3>
      <p>{props.retailprice}</p>
      <img src={props.photo}></img>
      <p>{props.color}</p>
      <p>{props.location}</p>
      <p>{props.requireddown}</p>
    </Link>
  );
};

export default Card;
