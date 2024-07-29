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
               <Route path="/" element={<Home />} />
               <Route path="/create" element={<Create />} />
               <Route path="/detail/:id" element={<Detail />} />
            </Routes>
         </div>
         <Footer />
      </div>
   );
};

export default MainApp;
