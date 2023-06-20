import React from "react";
import { withRouter } from "react-router-dom";
import carList from "./inventory.json";

const Car = (props) => {
  const propsMatch = Number(props.match.params.carID);
  console.log(propsMatch);

  const car = carList.find((car) => car.id === propsMatch);

  if (!car) {
    return <h1>Car not found</h1>;
  }
  return (
    <div className="car-page">
      <h1>{`${car.year} ${car.make} ${car.model}`}</h1>
    </div>
  );
};

export default withRouter(Car);
