import React from "react";
import "./Button.scss";

export const Button = ({ name, ...rest }) => {
   return (
      <div className="button" {...rest}>
         {name}
      </div>
   );
};
