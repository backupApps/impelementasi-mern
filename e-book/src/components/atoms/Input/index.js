import React from "react";
import "./Input.scss";

export const Input = ({ name }) => {
   return <input className="input" placeholder={name} />;
};
