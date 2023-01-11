import  { useEffect } from "react";
import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store";
import { Button, Container } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import useHttp from "../hooks/use-http";

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
    { 
      if(i.read===false)
      {
        unread+=1
      }
    }
}
const retrieve=useCallback((data)=>{
  
  dispatch(mailActions.recieved(data)) })
     console.log(mails);
    const emailadd=email.replace('@','');
    const myemail=emailadd.replace('.','')
   
  const {sendRequest:fetchmails}= useHttp(retrieve);
   
  
useEffect(() => {
	let interval = setInterval(() => {
        fetchmails({url:`${FIREBASE_DOMAIN}/${myemail}/inbox.json`});
	}, 1000);
    
return () => {
		clearInterval(interval);
	};
}, [fetchmails]);


const openMailHandler=(item)=>{
     
    dispatch(mailActions.currentmail(item))
      
     const key = Object.keys(allobjects).find(key => allobjects[key]===item);
     
     dispatch(mailActions.currentkey(key))
     if(currentKey)
     {  console.log(currentKey);
        Navigate("/maildetails")
     }
    }
const MailDeleteHandler=async(item)=>{
    const emailadd=email.replace('@','');
    const myemail=emailadd.replace('.','')
    const key = Object.keys(allobjects).find(key => allobjects[key] ===item);
     
    const response = await fetch(`${FIREBASE_DOMAIN}/${myemail}/inbox/${key}.json`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        }
    })
      const data=await response.json();
      if(response.ok)
      { if(mails.length==1)
        {
            dispatch(mailActions.recieved([]))
        }
        else{
           
            fetchmails();
        }  
        
      }
   }  
       
 return (
    <>
    <div>
        <h3>Your Messages</h3>
        <p>Unread messages : {unread} </p>
    </div>
    {
     mails   && mails.map(item=><Container className="border border-danger"><div id={item.id}>{item.read===false && <p>#</p>}<ul className="bg-info clearfix"id={item.id} onClick={openMailHandler.bind(null,item)} > {item.senderemail}--{item.Subject}</ul><Button className="btn-btn-warning" onClick={MailDeleteHandler.bind(null,item)} >Delete</Button> </div></Container>)
    }
    {
     !mails && <p>No mail recieved</p>   
    }
    
    </>
 )


}
export default Inbox;
