import React from "react";
import { bgRegister } from "../../assets";
import { Button, Gap, Input, Link } from "../../components/atoms";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const navigate = useNavigate();
   return (
      <div className="login">
         <img className="background-login" src={bgRegister} alt="" />
         <div className="form">
            <div className="form-login">
               <h1>REGISTER</h1>
               <Input name="Name" />
               <Gap height={10} />
               <Input name="Username" />
               <Gap height={10} />
               <Input name="Email" />
               <Gap height={10} />
               <Input name="Password" />
               <Gap height={20} />
               <Button name="Submit" onClick={() => navigate("/")} />
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
