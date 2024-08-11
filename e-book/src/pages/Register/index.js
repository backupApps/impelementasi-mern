import React, { useState } from "react";
import { bgRegister } from "../../assets";
import { Button, Gap, Input, Link } from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
   const navigate = useNavigate();
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleRegister = () => {
      const userData = {
         name,
         username,
         email,
         password,
      };

      Axios.post("http://localhost:4000/auth/register", userData)
         .then((response) => {
            Swal.fire({
               title: "Register Successful!",
               text: "You have successfully register.",
               icon: "success",
               confirmButtonText: "OK",
            }).then(() => {
               navigate("/login");
            });
         })
         .catch((err) => {
            Swal.fire({
               title: "Register Failed!",
               text: "Please check your name, username, email and password.",
               icon: "error",
               confirmButtonText: "Try Again",
            });
         });
   };

   return (
      <div className="login">
         <img className="background-login" src={bgRegister} alt="" />
         <div className="form">
            <div className="form-login">
               <h1>REGISTER</h1>
               <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <Gap height={10} />
               <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               <Gap height={10} />
               <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <Gap height={10} />
               <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <Gap height={20} />
               <Button title="Submit" onClick={handleRegister} />
               <p>
                  Sudah mempunyai akun?
                  <Link title="Sign in" onClick={() => navigate("/login")} />
               </p>
            </div>
         </div>
      </div>
   );
};

export default Register;
