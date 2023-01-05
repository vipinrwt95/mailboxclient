import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import TextEditor from "../components/TextEditor";


const Profile=()=>{
   
   const token =useSelector(state=>state.auth.tokenid)
   
    return (
        <>
        <h1>Welcome to your Mail-Box</h1>
        <NavLink to='/mail'>Compose Email</NavLink>
         </>
       )
}
export default Profile;