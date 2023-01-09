import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import TextEditor from "../components/TextEditor";
import { Button } from "react-bootstrap";


const Profile=()=>{
   
   const token =useSelector(state=>state.auth.tokenid)
   
    return (
        <>
        <h1>Welcome to your Mail-Box</h1>
        <NavLink to='/inbox'>Inbox</NavLink>
         </>
       )
}
export default Profile;