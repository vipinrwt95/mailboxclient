import React from "react";
import { useSelector } from "react-redux";

const Profile=()=>{
   
   const token =useSelector(state=>state.auth.tokenid)
    return (
        
        <h1>Welcome to your Mail-Box</h1>
    
      
    )

}
export default Profile;