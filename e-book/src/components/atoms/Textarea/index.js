import React from "react";
import "./Textarea.scss";

export const Textarea = ({ ...rest }) => {
   return <textarea className="textarea" {...rest}></textarea>;
};
