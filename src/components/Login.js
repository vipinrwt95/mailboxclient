import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from "react-router-dom";
import { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import { authActions } from '../store';
import {useDispatch } from 'react-redux';


const Login=()=> {
    const dispatch=useDispatch();
    const history=useNavigate();
   const enteredEmail=useRef();
   const enteredPassword=useRef();
   

  const formsignupHandler=(event)=>{
    event.preventDefault();
    
    const Password=enteredPassword.current.value;
    const Email=enteredEmail.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaRJjUMUJibbnGiiTbHYvoqeQX2Xrl2Ck",
      {
        method:'POST',
        body:JSON.stringify({
          email:Email,
          password:Password,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type':'application/json'
        }

      }).then(res=>{
        if(res.ok)
        {
          return res.json().then(data=>{
            console.log(data);
            dispatch(authActions.login(data.idToken))
            history('/profile')
            
          })
        }
        else{
          return res.json().then(data=>{
           alert(data.error.message)
          });
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
