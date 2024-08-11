import React, { useEffect, useState } from "react";
import { Button, Gap, Input, Label } from "../../components/atoms";
import "./Profile.scss";
import { unprofile } from "../../assets";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
   const navigate = useNavigate();
   const [profile, setProfile] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
         setError("Token not found, please login first");
         setLoading(false);
         return;
      }

      Axios.get("http://localhost:4000/auth/profile", {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
         .then((response) => {
            setProfile(response.data);
            setLoading(false);
         })
         .catch((err) => {
            console.log("Error token", err);
         });
   }, []);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>;

   return (
      <div className="profile">
         <div className="profile-wrap">
            <h1 className="profile-header">Profile</h1>
            {/* </div> */}
            <div className="profile-content">
               <div className="profile-image">
                  <img className="profile-img" src={unprofile} alt="" />
                  {/* <div className="profile-img-middle">
                  <div className="profile-img-text">Add Photo</div>
                  </div> */}
               </div>
               <div className="profile-data">
                  {/* <Label name="Name" />
                  <Input title="Name" type="text" value={profile.name} /> */}
                  <p className="profile-data-font">Name: {profile.name}</p>
                  {/* <Gap height={20} /> */}
                  {/* <Label name="Username" />
                  <Input
                     title="Username"
                     type="text"
                     value={profile.username}
                  /> */}
                  <p className="profile-data-font">
                     Username: {profile.username}
                  </p>
                  {/* <Gap height={20} /> */}
                  {/* <Label name="Email" />
                  <Input title="Email" type="email" value={profile.email} /> */}
                  <p className="profile-data-font">Email: {profile.email}</p>
                  {/* <Gap height={20} /> */}
               </div>
            </div>
            <Gap height={20} />
            <Button title="Edit Profile" />
         </div>
      </div>
   );
};

export default Profile;
