
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from './Components/Registration/Signup';
import Nav from './Components/Nav/Nav';
import Home from './Components/LandingPage/Home';
import Profile from './Components/Profile/Profile';

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
      <div className="navbar">
        {user ? <Nav /> : null}
      </div>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home newLogin={newLogin} isLogged={isLogged} setUser={setUser} user={user}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path={`/profile/${user?.id}`} element={<Profile user={user} />} />
        </Routes>
      </main>
    </Router>
  </div>
  );
}

export default App;
