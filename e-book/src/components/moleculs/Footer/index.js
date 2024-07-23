import React from "react";
import "./Footer.scss";
import {
   book,
   Discord,
   Facebook,
   Github,
   Instagram,
   Telegram,
   Twitter,
} from "../../../assets";

export const Footer = () => {
   return (
      <div className="footer">
         <img className="icon" src={book} alt="read" />
         <p>&copy;Copyright by agoengBani</p>
         <div className="footer-icon">
            <img className="icon" src={Facebook} alt="facebook" />
            <img className="icon" src={Instagram} alt="instagram" />
            <img className="icon" src={Twitter} alt="twitter" />
            <img className="icon" src={Telegram} alt="telegram" />
            <img className="icon" src={Discord} alt="discord" />
            <img className="icon" src={Github} alt="github" />
         </div>
      </div>
   );
};
