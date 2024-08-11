import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
   Button,
   Gap,
   Input,
   Label,
   Link,
   Textarea,
} from "../../components/atoms";
import "./Create.scss";
import UploadImg from "../../components/atoms/UploadImg";
import Swal from "sweetalert2";

const Create = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const [title, setTitle] = useState();
   const [body, setBody] = useState();
   const [author, setAuthor] = useState("");
   const [publisher, setPublisher] = useState("");
   const [date, setDate] = useState("");
   const [stock, setStock] = useState("");
   const [image, setImage] = useState("");
   const [originalImage, setOriginalImage] = useState(null);
   const [originalImageName, setOriginalImageName] = useState("");
   const [previewImage, setPreviewImage] = useState(null);
   const [isUpdate, setIsUpdate] = useState(false);

   useEffect(() => {
      if (id) {
         setIsUpdate(true);
         Axios.get(`http://localhost:4000/book/showdetailsbook/${id}`)
            .then((response) => {
               const book = response.data.data;
               setTitle(book.title);
               setBody(book.body);
               setAuthor(book.author);
               setPublisher(book.publisher);
               setDate(book.date);
               setStock(book.stock);
               setOriginalImage(book.image);
               setOriginalImageName(book.image.split("/").pop()); // Ekstrak nama file dari path
               setPreviewImage(`http://localhost:4000/${book.image}`);
            })
            .catch((err) => {
               console.log("Error fetching book details", err);
            });
      }
   }, [id]);

   const handleImageChange = (e) => {
      // kirim ke API
      const file = e.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setOriginalImageName(file.name);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("author", author);
      formData.append("publisher", publisher);
      formData.append("date", date);
      formData.append("stock", stock);
      // formData.append("image", image);
      if (image) {
         formData.append("image", image);
      } else if (originalImage) {
         formData.append("image", originalImage);
      }

      if (isUpdate) {
         Axios.put(`http://localhost:4000/book/update/${id}`, formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         })
            .then((response) => {
               Swal.fire({
                  title: "Edit Book Successful!",
                  text: "You have successfully edit book.",
                  icon: "success",
                  confirmButtonText: "OK",
               });
            })
            .catch((err) => {
               console.log("Error updating book", err);
            });
      } else {
         Axios.post("http://localhost:4000/book/insert", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         })
            .then((response) => {
               Swal.fire({
                  title: "Insert Book Successful!",
                  text: "You have successfully insert book.",
                  icon: "success",
                  confirmButtonText: "OK",
               });
            })
            .catch((err) => {
               console.log("Error creating book", err);
            });
      }
   };

   return (
      <div className="create">
         <div className="create-input">
            <h1>{isUpdate ? "Update" : "Insert New"} Book</h1>
            <div className="create-input-wrapper">
               {/* <div className="create-input-img"></div> */}
               <UploadImg onChange={handleImageChange} img={previewImage} />
               <div className="create-input-column">
                  <Label name="Title" />
                  <Gap height={5} />
                  <Input
                     type="text"
                     name="title"
                     placeholder="Buku Panduan"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
                  <Gap height={20} />
                  <Label name="Author" />
                  <Gap height={5} />
                  <Input
                     type="text"
                     name="author"
                     placeholder="Unknown"
                     value={author}
                     onChange={(e) => setAuthor(e.target.value)}
                  />
                  <Gap height={20} />
                  <Label name="Publisher" />
                  <Gap height={5} />
                  <Input
                     type="text"
                     name="publisher"
                     placeholder="Unknown"
                     value={publisher}
                     onChange={(e) => setPublisher(e.target.value)}
                  />
                  <Gap height={20} />
               </div>
               <div className="create-input-column">
                  <Label name="Date" />
                  <Gap height={5} />
                  <Input
                     type="text"
                     name="date"
                     placeholder="January 1, 2001"
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                  />
                  <Gap height={20} />
                  <Label name="Stock" />
                  <Gap height={5} />
                  <Input
                     type="number"
                     name="stock"
                     placeholder="5"
                     value={stock}
                     onChange={(e) => setStock(e.target.value)}
                  />
               </div>
            </div>
            <Gap height={20} />
            <div className="input-description">
               <Label name="Description" />
               <Gap height={5} />
               <Textarea
                  name="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
               />
            </div>
            <Gap height={20} />
            <Button title="Submit" type="submit" onClick={handleSubmit} />
            <Link title="< Back" onClick={() => navigate("/m")} />
         </div>
      </div>
   );
};

export default Create;
