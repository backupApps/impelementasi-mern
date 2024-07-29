import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.scss";
import { Gap, Link } from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import { Book } from "../../assets";
import Axios from "axios";

const Detail = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const [book, setBook] = useState();

   useEffect(() => {
      Axios.get(`http://localhost:4000/book/showdetailsbook/${id}`)
         .then((response) => {
            setBook(response.data.book);
         })
         .catch((err) => {
            console.log("Error fetching book details", book);
         });
   }, [id]);

   if (!book) {
      return <div>Loading...</div>;
   }

   return (
      <div className="detail">
         <div className="detail-content">
            <div>
               <Link title="< Back" onClick={() => navigate("/")} />
               <img
                  className="detail-image"
                  src={`http://localhost:4000/${book.image}`}
                  alt={book.title}
               />
            </div>
            <div className="detail-content-wrapper">
               <Gap height={15} />
               <p className="detail-title">{book.title}</p>
               <p>Author: {book.author}</p>
               <p>Publisher: {book.publisher}</p>
               <p>Date: {book.date}</p>
               <p>Stock: {book.stock}</p>
               <p>Description:</p>
               <p className="detail-body">{book.body}</p>
            </div>
         </div>
      </div>
   );
};

export default Detail;
