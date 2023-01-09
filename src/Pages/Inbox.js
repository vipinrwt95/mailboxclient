import  { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store";
import { Button, Container } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const FIREBASE_DOMAIN="https://mailbox-client-f3112-default-rtdb.firebaseio.com/";
const Inbox=()=>{
    const Navigate=useNavigate();
   const dispatch=useDispatch();
   const allobjects=useSelector(state=>state.mails.allobjects)
   const currentKey=useSelector(state=>state.mails.currentkey)
const email=useSelector(state=>state.auth.email);
const mails=useSelector(state=>state.mails.recievedmails)
let unread=0;
if(mails)
{
     for(let i of mails)
    { console.log(i.read)
      if(i.read===false)
      {
        unread+=1
      }
    }
}

const fetchmails=async()=>{
    const emailadd=email.replace('@','');
    const myemail=emailadd.replace('.','')
    const response = await fetch(`${FIREBASE_DOMAIN}/${myemail}/inbox.json`)
    
    const data=await response.json();
   dispatch(mailActions.recieved(data)) 
    
     
}
useEffect(()=>{
 fetchmails();
 
},[])


const openMailHandler=(item)=>{
     
    dispatch(mailActions.currentmail(item))
      
     const key = Object.keys(allobjects).find(key => allobjects[key] ===item);
     
     dispatch(mailActions.currentkey(key))
     if(currentKey)
     {  
        Navigate("/maildetails")
     }
     
       
}
 return (
    <>
    <div>
        <h3>Your Messages</h3>
        <p>Unread messages : {unread} </p>
    </div>
    {
     mails   && mails.map(item=><Container className="border border-danger"><div id={item.id}onClick={openMailHandler.bind(null,item)}>{item.read===false && <p>#</p>}<ul className="bg-info clearfix"id={item.id}> {item.senderemail}--{item.Subject}</ul></div></Container>)
    }
    {
     !mails && <p>No mail recieved</p>   
    }
    <Button className="btn btn-warning" ><Link to='/mail'>COMPOSE MAIL</Link></Button>
    </>
 )


}
export default Inbox;
