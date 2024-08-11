import React from "react";
import "./Sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { read } from "../../../assets";

export const Sidebar = () => {
   const navigate = useNavigate();

   const handleLogout = async () => {
      const confirm = await Swal.fire({
         title: "Try Logout",
         text: "Are you sure you want to logout?",
         icon: "warning",
         confirmButtonText: "Yes",
         showCancelButton: true,
         cancelButtonText: "No",
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
      });

      if (confirm.isConfirmed) {
         Swal.fire("Logout Successful", "", "success");
         navigate("/login");
      }
   };

   return (
      <div className="sidebar">
         <div className="sidebar-logo">
            <img className="header-logo" src={read} alt="" />
            <h1 style={{ cursor: "default" }} onClick={() => navigate("/m")}>
               e-book
            </h1>
         </div>
         <div className="sidebar-links">
            <Link to="/m/insert">Add Book</Link>
            <Link to="">Settings</Link>
            <Link to="/m/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
         </div>
      </div>
   );
};
