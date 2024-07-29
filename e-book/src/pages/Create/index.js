import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "../../assets";
import {
   Button,
   Gap,
   Input,
   Label,
   Link,
   Textarea,
} from "../../components/atoms";
import "./Create.scss";

const Create = () => {
   const navigate = useNavigate();
   const [title, setTitle] = useState("");
   const [body, setBody] = useState("");
   const [author, setAuthor] = useState("");
   const [publisher, setPublisher] = useState("");
   const [date, setDate] = useState("");
   const [stock, setStock] = useState("");
   const [image, setImage] = useState(null);

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   const formData = new FormData();
   formData.append("title", title);
   formData.append("body", body);
   formData.append("author", author);
   formData.append("publisher", publisher);
   formData.append("date", date);
   formData.append("stock", stock);
   formData.append("image", image);

   Axios.post("http://localhost:4000/book/insert", formData)
      .then((response) => {
         console.log(response.data);
      })
      .catch((err) => {
         console.log("Error insert book", err);
      });

   return (
      <>
         <div className="create">
            <form className="create-input" onSubmit={handleSubmit}>
               <h1>Create Book</h1>
               <div className="create-input-wrapper">
                  <div className="create-input-img">
                     <img className="create-image" src={Book} alt="image" />
                     <input type="file" />
                  </div>
                  <div className="create-input1">
                     <Label name="Title" />
                     <Input
                        name="Buku Panduan"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                     />
                     <Gap height={20} />
                     <Label name="Author" />
                     <Input
                        name="Agung Syabani"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                     />
                     <Gap height={20} />
                     <Label name="Publisher" />
                     <Input
                        name="Mamad Ujang"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                     />
                     <Gap height={20} />
                  </div>
                  <div className="create-input1">
                     <Label name="Date" />
                     <Input
                        name="1 January 2001"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                     />
                     <Gap height={20} />
                     <Label name="Stock" />
                     <Input
                        name="5"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                     />
                  </div>
               </div>
               <Label name="Description" />
               <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
               />
               <Gap height={20} />
               <Button name="Submit" onClick={() => navigate("/")} />
               <Link title="< Back" onClick={() => navigate("/")} />
            </form>
         </div>
      </>
   );
};

export default Create;
