import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.scss";
import { Button, Gap, Link } from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

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

   const handleDeleted = async (id) => {
      const confirm = await Swal.fire({
         title: "Try Logout",
         text: "Are you sure you want to delete this book?",
         icon: "warning",
         confirmButtonText: "Yes",
         showCancelButton: true,
         cancelButtonText: "No",
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
      });

      if (confirm.isConfirmed) {
         Axios.delete(`http://localhost:4000/book/showdetailsbook/${id}`);
         Swal.fire("Deleted Successful", "", "success");
         navigate("/m");
      }
   };

   if (!book) {
      return <div>Loading...</div>;
   }

   return (
      <div className="detail">
         <div className="detail-content">
            <div>
               <Link title="< Back" onClick={() => navigate("/m")} />
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
                     onClick={() => navigate(`/m/insert/${id}`)}
                  />
                  <Button
                     title="Delete"
                     style={{
                        backgroundColor: "#f34848",
                        color: "white",
                        width: "50px",
                     }}
                     onClick={() => handleDeleted(id)}
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
