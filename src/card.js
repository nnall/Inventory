import React from "react";
import { Link } from "react-router-dom";
import ReactDom from "react-dom";
import placeholder from "./img/placeholder.jpg";

// import

const Card = (props) => {
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
  // props.stock
  return (
    <div className="card">
      <h3>{`${props.year} ${props.make}`}</h3>
      <h5>{`${props.model}`}</h5>
      {/* <p className="retail-tag">Retail: ${numberTrans(props.retailprice)}</p> */}
      <img src={props.photo ? props.photo : placeholder}></img>

      <div className="card-details">
        <p>Color: {props.color}</p>
        <p>Location: {locationTrans(props.location)}</p>
        <p className="retail-tag">Retail: ${numberTrans(props.retailprice)}</p>
        <p>Stock: {props.stock}</p>

        <p>${numberTrans(props.requireddown)} Down Payment</p>
      </div>

      <div className="cardLinks">
        <a
          // to={`https://holmesmotors.com/vehicle-details?stock=${props.stock}`}
          href={`https://holmesmotors.com/vehicle-details?stock=${props.stock}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="card-btn seeDetails-btn">See Details</button>
        </a>
        <a
          // to={`https://holmesmotors.com/vehicle-details?stock=${props.stock}`}
          href={`https://buy.holmesmotors.com/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="card-btn seeDetails-btn">Get Pre-Approved</button>
        </a>
      </div>
    </div>
  );
};

export default Card;
