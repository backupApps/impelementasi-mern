import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.scss";
import { Button, Gap, Link } from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Detail = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const [book, setBook] = useState(null);

   useEffect(() => {
      Axios.get(`http://localhost:4000/book/showdetailsbook/${id}`)
         .then((response) => {
            console.log("Books data:", response.data);
            setBook(response.data.data);
         })
         .catch((err) => {
            console.log("Error fetching book details", err);
         });
   }, [id]);

   const deleteConfirm = (id) => {
      console.log("check id: ", id);
      const confirm_ = window.confirm(
         "Are you sure you want to delete this book?"
      );
      if (confirm_) {
         Axios.delete(`http://localhost:4000/book/showdetailsbook/${id}`)
            .then((response) => {
               alert("Delete Book Successfully");
               navigate("/");
            })
            .catch((err) => {
               console.log("Error deleting book", err);
            });
      } else {
         console.log("Deletion cancelled");
      }
   };

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
               <div style={{ display: "flex" }}>
                  <Button
                     title="Edit"
                     style={{
                        backgroundColor: "#6958ff",
                        color: "white",
                        width: "50px",
                        marginRight: "5px",
                     }}
                     onClick={() => navigate(`/insert/${id}`)}
                  />
                  <Button
                     title="Delete"
                     style={{
                        backgroundColor: "#f34848",
                        color: "white",
                        width: "50px",
                     }}
                     onClick={() => deleteConfirm(id)}
                  />
               </div>
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
