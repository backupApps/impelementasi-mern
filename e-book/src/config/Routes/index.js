import React from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import MainApp from "../../pages/Main";

const Routing = () => {
   return (
      <Router>
         <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/m/*" element={<MainApp />} />
         </Routes>
      </Router>
   );
};

export default Routing;
