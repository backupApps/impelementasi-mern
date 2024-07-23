import React from "react";
import { Button, Gap, Input, Label, Textarea } from "../../components/atoms";
import "./Create.scss";
import { Footer, Header } from "../../components/moleculs";
import { useNavigate } from "react-router-dom";
import { Book } from "../../assets";

const Create = () => {
   const navigate = useNavigate();
   return (
      <>
         <div className="create">
            <Header />
            <div className="create-input">
               <h1>Create Book</h1>
               <img className="create-image" src={Book} alt="image" />
               <Gap height={20} />
               <Label name="Title" />
               <Input name="Title" />
               <Gap height={20} />
               <Label name="Author" />
               <Input name="Author" />
               <Gap height={20} />
               <Label name="Description" />
               <Textarea />
               <Gap height={20} />
               <Button name="Submit" onClick={() => navigate("/")} />
            </div>
            <Footer />
         </div>
      </>
   );
};

export default Create;
