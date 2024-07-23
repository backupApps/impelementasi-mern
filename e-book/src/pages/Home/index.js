import React from "react";
import "./Home.scss";
import { Cards, Footer, Header } from "../../components/moleculs";
import { Button } from "../../components/atoms";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate();
   return (
      <div className="home">
         <Header />
         <div className="content">
            <h1>KUMPULAN BUKU MENARIK</h1>
            <Button name="Create Book" onClick={() => navigate("/create")} />
            <div className="content-cards">
               <Cards />
               <Cards />
               <Cards />
               <Cards />
               <Cards />
               <Cards />
               <Cards />
               <Cards />
               <Cards />
               <Cards />
               <Cards />
               <Cards />
               <Cards />
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default Home;
