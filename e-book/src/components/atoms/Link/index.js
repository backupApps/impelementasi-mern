import React from "react";
import "./Link.scss";

export const Link = ({ title, onClick }) => {
   return (
      <p className="link" onClick={onClick}>
         {title}
      </p>
   );
};
