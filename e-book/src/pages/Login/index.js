import React from "react";
import { bgLogin } from "../../assets";
import "./Login.scss";
import { Button, Gap, Input, Link } from "../../components/atoms";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const navigate = useNavigate();
   return (
      <div className="login">
         <img className="background-login" src={bgLogin} alt="" />
         <div className="form">
            <div className="form-login">
               <h1>LOGIN</h1>
               <Gap height={10} />
               <Input name="Email / Username" />
               <Gap height={10} />
               <Input name="Password" />
               <Gap height={20} />
               <Button name="Submit" onClick={() => navigate("/")} />
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
