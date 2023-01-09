import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { mailActions } from "../store";

const FIREBASE_DOMAIN="https://mailbox-client-f3112-default-rtdb.firebaseio.com/";
const Maildetails=()=>{
const maildetail=useSelector(state=>state.mails.currentmail)
const key=useSelector(state=>state.mails.currentkey)
 
const reademailHandler=async()=>{
    
    const emailad=maildetail.recieveremail.replace('@','')
    const emailadd=emailad.replace('.','')
    const maildetails={
      Subject:maildetail.Subject,
      message:maildetail.message,
      read:true,
      recieveremail:maildetail.recieveremail,
       senderemail:maildetail.senderemail
    }
    const response = await fetch(`${FIREBASE_DOMAIN}/${emailadd}/inbox/${key}.json`, {
        method: 'PUT',
        body: JSON.stringify(maildetails),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
    
      if (response.ok) {
        console.log(data);
      }
      
    
} 
useEffect(()=>{
  reademailHandler();
},[maildetail])
return (
     <div>

      <h6>{maildetail.senderemail}</h6>
       <ul>Subject : {maildetail.Subject}</ul>
       Message:
       <ul>{maildetail.message}</ul>
     </div>
     

   )

}

export default Maildetails;