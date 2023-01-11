import React from "react";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import TextEditor from "./TextEditor";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState , convertToRaw } from "draft-js";
import { useState ,useCallback } from "react";
import { Container } from "react-bootstrap";
import draftToHtml from 'draft-js';
import { matchRoutes } from "react-router";
import useHttp from "../hooks/use-http";
const FIREBASE_DOMAIN="https://mailbox-client-f3112-default-rtdb.firebaseio.com/";
const MailCompose=()=>{
    const emailid=useSelector(state=>state.auth.email);
    const emailentered=useRef();
    const Subjectentered=useRef();
    const[editorState,setEditorState]=useState(()=>EditorState.createEmpty())
const message=convertToRaw(editorState.getCurrentContent()).blocks;
let mailtext='';
message.map(item=>mailtext=mailtext+item.text+' ')
const userSentHandler=useCallback((data)=>{if(data)
  { 
   console.log('email sent');
  }}) 
const {sendRequest:sendmail}=useHttp(userSentHandler);
async function SendMailHandler(event){ 

        event.preventDefault();
        
        const email=emailentered.current.value;
        const Subject=Subjectentered.current.value;
        
        const maildetails={
            senderemail:emailid, 
            recieveremail:email,
            Subject:Subject,
            message:mailtext,
            read:false
        }
        
          
      const emaill=email.replace('@','')
      const emailadd=emaill.replace('.','')
      const sentemail=emailid.replace('@','')
      const sentemailid=sentemail.replace('.','')

    sendmail({url:`${FIREBASE_DOMAIN}/${emailadd}/inbox.json`,method:'POST',headers:{
        'Content-Type': 'application/json',
      },
    body:maildetails})
    sendmail({url:`${FIREBASE_DOMAIN}/${sentemailid}/sent.json`,method:'POST',headers:{
      'Content-Type': 'application/json',
    },
  body:maildetails})
}
             
return (
    <>
    <h1 align="center">COMPOSE MAIL</h1>
    <Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>To</Form.Label>
        <Form.Control type="email" placeholder="Recipient Email" ref={emailentered}/>
    </Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>SUBJECT</Form.Label>
        <Form.Control type="text" placeholder="Subject of mail"  ref={Subjectentered}/>
      </Form.Group>
 <Container className="p-6 mb-10 bg-light text-dark">
            <div>
            <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState} />    
            </div>
  </Container>  
<div>
    <Button variant="primary" type="submit" onClick={SendMailHandler}>
         SEND
      </Button>
</div>
    </Form>
    </>
)
}

export default MailCompose;