
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from './Components/Registration/Signup';
import Login from './Components/Registration/Login';
import Nav from './Components/Nav/Nav';
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function App() {

  const [user, setUser] = useState();


  const [isLogged, setIsLogged] = useState(false);

  const newLogin = () => {
    setIsLogged(!isLogged);
  };


  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
  }, [isLogged]);
  

console.log(user)

  return (
    <div className="App">


    <Router>
    {user ? 
    <Nav/>: null
    
  }
      <main>
        <Routes>
        <Route path="/login" element={<Login newLogin={newLogin}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </main>

    </Router>
  </div>
  );
}

export default App;
