import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Cards } from "../../components/moleculs";
import { Button } from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Home = () => {
   const navigate = useNavigate();
   const [books, setBooks] = useState([]);

   useEffect(() => {
      Axios.get("http://localhost:4000/book/showbooks")
         .then((response) => {
            console.log("Books data:", response.data);
            if (response.data && response.data.data) {
               setBooks(response.data.data);
            } else {
               console.log("No books found in the response data");
            }
         })
         .catch((err) => {
            console.log("Error fetching the books", err);
         });
   }, []);

   return (
      <div className="home">
         <div className="content">
            <h1>KUMPULAN BUKU MENARIK</h1>
            <Button name="Create Book" onClick={() => navigate("/create")} />
            <div className="content-cards">
               {books.length > 0 ? (
                  books.map((book) => (
                     <Cards
                        key={book._id}
                        _id={book._id}
                        title={book.title}
                        body={book.body}
                        author={book.author ? book.author : "Unknown Author"}
                        date={book.date}
                        image={book.image}
                     />
                  ))
               ) : (
                  <h1>No books available</h1>
               )}
            </div>
         </div>
      </div>
   );
};

export default Home;
