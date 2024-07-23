import React from "react";
import { Footer, Header } from "../../components/moleculs";
import "./Detail.scss";
import { Link } from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import { Book } from "../../assets";

const Detail = () => {
   const navigate = useNavigate();
   return (
      <div className="detail">
         <Header />
         <div className="detail-content">
            <img className="detail-image" src={Book} alt="image" />
            <p className="detail-title">Title</p>
            <p className="detail-author">Author | Date</p>
            <p className="detail-body">
               Lorem Ipsum is simply dummy text of the printing and typesetting
               industry. Lorem Ipsum has been the industry's standard dummy text
               ever since the 1500s, when an unknown printer took a galley of
               type and scrambled it to make a type specimen book.
            </p>
         </div>
         <Link title="Back" onClick={() => navigate("/")} />
         <Footer />
      </div>
   );
};

export default Detail;
