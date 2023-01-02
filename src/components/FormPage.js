import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavLink from 'react-bootstrap/NavLink';
import { useRef } from 'react';

function FormPage() {
   const enteredEmail=useRef();
   const enteredPassword=useRef();
   const confirmpassword=useRef();

  const formsignupHandler=(event)=>{
    event.preventDefault();
    
    const Password=enteredPassword.current.value;
    const conpassword=confirmpassword.current.value;
    const Email=enteredEmail.current.value;

    if(Password===conpassword)
    {
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaRJjUMUJibbnGiiTbHYvoqeQX2Xrl2Ck",
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
        console.log("User has successfully signed up"); 
      }
      else{
        return res.json().then(data=>{
         alert(data.error.message)
        });
      }
    })}
    else 
    { 
      alert('Passwords do not match , Try again')
    }

}
  return (
    <Container>
      <h1>SIGN UP</h1>
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
      <NavLink>Already have an account , Sign In </NavLink>
      <div><Button variant="primary" type="submit">
        SIGN UP
      </Button>
      
      </div>
    </Form>
    </Container>
  );
}

export default FormPage
