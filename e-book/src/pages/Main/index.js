import React from "react";
import { Routes, Route } from "react-router-dom";
import { Footer, Header } from "../../components/moleculs";
import Home from "../Home";
import Create from "../Create";
import Detail from "../Detail";
import "./Main.scss";

const MainApp = () => {
   return (
      <div className="main">
         <Header />
         <div className="main-content">
            <Routes>
               <Route exact path="/" element={<Home />} />
               <Route path="/insert/:id?" element={<Create />} />
               <Route path="/showdetailsbook/:id" element={<Detail />} />
            </Routes>
         </div>
         <Footer />
      </div>
   );
};

export default MainApp;
