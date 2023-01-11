import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { mailActions } from "../store";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useHttp from "../hooks/use-http";

const FIREBASE_DOMAIN="https://mailbox-client-f3112-default-rtdb.firebaseio.com/";
const Maildetails=()=>{
const maildetail=useSelector(state=>state.mails.currentmail)
const key=useSelector(state=>state.mails.currentkey)
const {sendRequest:openmail}=useHttp();
const emailad=maildetail.recieveremail.replace('@','')
    const emailadd=emailad.replace('.','')
    const maildetails={
      Subject:maildetail.Subject,
      message:maildetail.message,
      read:true,
      recieveremail:maildetail.recieveremail,
       senderemail:maildetail.senderemail
    }
    console.log(maildetails);
    openmail({url:`${FIREBASE_DOMAIN}/${emailadd}/inbox/${key}.json`,method:'PUT',headers: {
      'Content-Type': 'application/json',
    },body:maildetails});
  

return (
     <div>
     <h6>{maildetail.senderemail}</h6>
       <ul>Subject : {maildetail.Subject}</ul>
       Message:
       <ul>{maildetail.message}</ul>
      <Button className="btn btn-warning" ><Link to='/mail'>REPLY</Link></Button>
     </div>
     

   )

}

export default Maildetails;