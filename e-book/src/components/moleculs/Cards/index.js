import React from "react";
import "./Cards.scss";
import { Button } from "../../atoms";
import { useNavigate } from "react-router-dom";

export const Cards = (props) => {
   const navigate = useNavigate();
   const { title, image, author, _id } = props;
   return (
      <div className="container">
         <div className="cards">
            <img
               className="img"
               src={`http://localhost:4000/${image}`}
               alt={title}
            />
            <div>
               <p className="title">{title}</p>
               <p className="author">{author ? author : "Unknown Author"}</p>
            </div>
            <Button
               title="View Detail"
               onClick={() => navigate(`/showdetailsbook/${_id}`)}
            />
         </div>
      </div>
   );
};
