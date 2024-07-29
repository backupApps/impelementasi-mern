import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import MainApp from "../../pages/Main";

const Routing = () => {
   return (
      <Router>
         <Routes>
            <Route path="/*" element={<MainApp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      </Router>
   );
};

export default Routing;
