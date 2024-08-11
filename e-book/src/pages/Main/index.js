import React from "react";
import { Routes, Route } from "react-router-dom";
import { Footer, Header, Sidebar } from "../../components/moleculs";
import "./Main.scss";
import Home from "../Home";
import Create from "../Create";
import Detail from "../Detail";
import Profile from "../Profile";

const MainApp = () => {
   return (
      <div className="main-app">
         <div className="main-sidebar">
            <Sidebar />
         </div>
         <div className="main">
            <Header />
            <div className="main-content">
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="insert/:id?" element={<Create />} />
                  <Route path="showdetailsbook/:id" element={<Detail />} />
                  <Route path="profile" element={<Profile />} />
               </Routes>
            </div>
            <Footer />
         </div>
      </div>
   );
};

export default MainApp;
