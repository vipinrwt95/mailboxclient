import logo from './logo.svg';
import './App.css';
import { Card, Container } from 'react-bootstrap';
import FormPage from './components/FormPage';
import Login from './components/Login';
import {Route,Routes} from 'react-router-dom';
import Profile from './Pages/Profile';
import MailCompose from './components/MailCompose';

function App() {
  return (
    <>
    <Routes>
    <Route path='/' exact element={<FormPage />}>
    </Route>
    <Route path='/login' element={<Login />}>
    </Route>
    <Route path='/profile' element={<Profile />}>
    </Route>
    <Route path='/mail' element={<MailCompose />}></Route>
  </Routes>
    </>
  );
}

export default App;
