import  { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
const FIREBASE_DOMAIN="https://mailbox-client-f3112-default-rtdb.firebaseio.com/";
const Inbox=()=>{
   const dispatch=useDispatch();
const email=useSelector(state=>state.auth.email);
const mails=useSelector(state=>state.mails.recievedmails)
const fetchmails=async()=>{
    const emailadd=email.replace('@','');
    const myemail=emailadd.replace('.','')
    const response = await fetch(`${FIREBASE_DOMAIN}/${myemail}/inbox.json`)
    
    const data=await response.json();
     const messages=Object.values(data)
     dispatch(mailActions.recieved(messages)) 
     
}
useEffect(()=>{
 fetchmails();
 
},[])
const messages=[];
 if(mails)
 {
    mails.map(item=>{item.message.map(item=>{messages.push(item.text)})}); 
    console.log(messages);
 }

 return (
    <>
    <div>
        <h3>Your Messages</h3>
    </div>
    {
     mails && messages.map(item=><li>{item}</li>)
    }
    <Button className="btn btn-warning" ><Link to='/mail'>COMPOSE MAIL</Link></Button>
    </>
 )


}
export default Inbox;
