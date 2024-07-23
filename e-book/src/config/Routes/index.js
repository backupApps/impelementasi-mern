import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { Create, Home } from "../../pages";
import Detail from "../../pages/Detail";

const Routing = () => {
   return (
      <Router>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<Create />} />
            <Route path="/detail" element={<Detail />} />
            <Route index element={<Home />} />
         </Routes>
      </Router>
   );
};

export default Routing;
