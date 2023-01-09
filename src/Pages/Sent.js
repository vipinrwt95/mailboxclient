import  { useEffect } from "react";
import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store";
import { Button, Container } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const FIREBASE_DOMAIN="https://mailbox-client-f3112-default-rtdb.firebaseio.com/";
const Sent=()=>{
  const Navigate=useNavigate();
   const dispatch=useDispatch();
    const email=useSelector(state=>state.auth.email);
    const mails=useSelector(state=>state.mails.sentemails)
    const allobjects=useSelector(state=>state.mails.sentobjects)
    const currentKey=useSelector(state=>state.mails.currentkey)

const fetchmails=async()=>{
    const emailadd=email.replace('@','');
    const myemail=emailadd.replace('.','')
    const response = await fetch(`${FIREBASE_DOMAIN}/${myemail}/sent.json`)
    const data=await response.json();
   if(response.ok)
   { 
    dispatch(mailActions.sent(data));
   }
   
    
     
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
const MailDeleteHandler=async(item)=>{
    const emailadd=email.replace('@','');
    const myemail=emailadd.replace('.','')
    const key = Object.keys(allobjects).find(key => allobjects[key] ===item);
     
    const response = await fetch(`${FIREBASE_DOMAIN}/${myemail}/sent/${key}.json`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        }
    })
      const data=await response.json();
      if(response.ok)
      { if(mails.length==1)
        {
            dispatch(mailActions.sent([]))
        }
        else{
           
            fetchmails();
        }  
        
      }
   }  
       
 return (
    <>
    <div>
        <h3>Messages You Sent</h3>
        
    </div>
    {
     mails   && mails.map(item=><Container className="border border-danger"><div id={item.id}><ul className="bg-info clearfix"id={item.id} onClick={openMailHandler.bind(null,item)} > {item.senderemail}--{item.Subject}</ul><Button className="btn-btn-warning" onClick={MailDeleteHandler.bind(null,item)} >Delete</Button> </div></Container>)
    }
    {
     !mails && <p>Send your first mail</p>   
    }
    <Button className="btn btn-warning" ><Link to='/mail'>COMPOSE MAIL</Link></Button>
    </>
 )


}
export default Sent;
