import React from "react";
import "./UploadImg.scss";
import { Book } from "../../../assets";

const UploadImg = ({ img, value, ...rest }) => {
   return (
      <div className="upload">
         {img ? (
            <img className="create-image" src={img} alt="preview" />
         ) : (
            <img className="create-image" src={Book} alt="" />
         )}
         <input className="name-image" type="file" value={value} {...rest} />
      </div>
   );
};

export default UploadImg;
