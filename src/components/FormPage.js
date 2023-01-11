import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from "react-router-dom";
import { useRef } from 'react';
import useHttp from '../hooks/use-http';


 function FormPage() {
   const enteredEmail=useRef();
   const enteredPassword=useRef();
   const confirmpassword=useRef();
   const retrieveauth=(data)=>{
      console.log(data)
   }
   const {sendRequest:signUp}= useHttp(retrieveauth);
   

  const formsignupHandler=(event)=>{
    event.preventDefault();
    
    const Password=enteredPassword.current.value;
    const conpassword=confirmpassword.current.value;
    const Email=enteredEmail.current.value;

    if(Password===conpassword)
    {
      signUp({url:"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaRJjUMUJibbnGiiTbHYvoqeQX2Xrl2Ck",method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:{
        email:Email,
        password:Password,
        returnSecureToken:true
      }
    })}
  }
    
      
return (
    <Container>
      <h1 align="center">SIGN UP</h1>
    <Form onSubmit={formsignupHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={enteredEmail} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={enteredPassword} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password Again" ref={confirmpassword} />
      </Form.Group>
      <NavLink to="/login">Already have an account , Sign In </NavLink>
      
      <div><Button variant="primary" type="submit">
        SIGN UP
      </Button>
      
      </div>
    </Form>
    </Container>
  );
}

 
export default FormPage;