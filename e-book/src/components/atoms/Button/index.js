import React from "react";
import "./Button.scss";

export const Button = ({ title, ...rest }) => {
   return (
      <div className="button" {...rest}>
         {title}
      </div>
   );
};
