import React from "react";
import "./Input.scss";

export const Input = ({ placeholder, type, ...rest }) => {
   return (
      <input
         className="input"
         type={type}
         placeholder={placeholder}
         {...rest}
      />
   );
};
