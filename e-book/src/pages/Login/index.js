import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import { bgLogin } from "../../assets";
import { Button, Gap, Input, Link } from "../../components/atoms";
import "./Login.scss";

const Login = () => {
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleLogin = () => {
      const userData = {
         username,
         password,
      };

      Axios.post("http://localhost:4000/auth/login", userData)
         .then((response) => {
            const token = response.data.token;
            localStorage.setItem("token", token);
            Swal.fire({
               title: "Login Successful!",
               text: "You have successfully logged in.",
               icon: "success",
               confirmButtonText: "OK",
            }).then(() => {
               navigate("/m");
            });
         })
         .catch((err) => {
            console.error("Login Failed", err);
            Swal.fire({
               title: "Login Failed!",
               text: "Please check your username and password.",
               icon: "error",
               confirmButtonText: "Try Again",
            });
         });
   };

   return (
      <div className="login">
         <img className="background-login" src={bgLogin} alt="" />
         <div className="form">
            <div className="form-login">
               <h1>LOGIN</h1>
               <Gap height={10} />
               <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               <Gap height={10} />
               <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <Gap height={20} />
               <Button title="Submit" onClick={handleLogin} />
               <p>
                  Belum mempunyai akun?
                  <Link title="Sign up" onClick={() => navigate("/register")} />
               </p>
            </div>
         </div>
      </div>
   );
};

export default Login;
