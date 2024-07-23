import React from "react";
import "./Header.scss";
import { Button } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { read } from "../../../assets";

export const Header = () => {
   const navigate = useNavigate();
   return (
      <div className="header">
         <img className="header-logo" src={read} alt="book" />
         <h1 className="header-title">e-book</h1>
         <div className="header-wrapper">
            <Button name="Sign up" onClick={() => navigate("/register")} />
            <Button name="Sign in" onClick={() => navigate("/login")} />
         </div>
      </div>
   );
};
