import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from "react-router-dom";
import { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import { authActions } from '../store';
import {useDispatch } from 'react-redux';
import useHttp from '../hooks/use-http';


const Login=()=> {
    const dispatch=useDispatch();
    const history=useNavigate();
   const enteredEmail=useRef();
   const enteredPassword=useRef();
   const retrieveauth=(data)=>{
       if(typeof data=='string')
       {
        alert (data)
       }
       else{
        dispatch(authActions.login(data))
        history('/profile')
       }  
      }
   const {sendRequest:login}= useHttp(retrieveauth);
  const formsignupHandler=(event)=>{
    event.preventDefault();
    
    const Password=enteredPassword.current.value;
    const Email=enteredEmail.current.value;

    login({url:"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaRJjUMUJibbnGiiTbHYvoqeQX2Xrl2Ck",method:'POST',
  body:{email:Email,
    password:Password,
    returnSecureToken:true},
    headers:{
      'Content-Type':'application/json'
    }
  })
  }
  return (
    <Container>
      <h1 align="center">LOG IN </h1>
    <Form onSubmit={formsignupHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={enteredEmail} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={enteredPassword} />
      </Form.Group>
      <NavLink to="/">New here , Sign Up </NavLink>
      <div><Button variant="primary" type="submit">
        LOG IN
      </Button>
      </div>
    </Form>
    </Container>
  );
}

export default Login;
