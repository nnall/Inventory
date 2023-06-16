import React, { Component } from "react";
import { useState } from "react";

import Input from "./input.js";

// Generates checkbox html from arrays

export default function Checkboxes(item) {
  return (
    <>
      <Input for={item}></Input>
      <label for={item}>{item}</label>
    </>
  );
}
