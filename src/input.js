import React from "react";

const Input = (prop) => {
  return (
    <div>
      <input type="checkbox" for={prop} />
      <label>{prop}</label>
    </div>
  );
};

export default Input;
