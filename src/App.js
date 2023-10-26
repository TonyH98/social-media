
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from './Components/Registration/Signup';
import Nav from './Components/Nav/Nav';
import Home from './Components/LandingPage/Home';
import Profile from './Components/Profile/Profile';
import SearchPosts from './Components/SearchPosts/SearchPosts';
import PostsDetails from './Components/PostsDetails/PostsDetails';
import OtherProfile from './Components/OtherProfile/OtherProfile'
import Followings from './Components/Following/Followings';
import Followers from './Components/Following/Followers';
import Notifications from './Components/Notifications/Notifications';
import Footer from './Components/Footer/Footer';
import Verification from './Components/Registration/Verification';
import axios from 'axios';
import { useDispatch , useSelector } from "react-redux";
import { fetchUsers} from "./Store/userActions";

const API = process.env.REACT_APP_API_URL;

const newAPI = process.env.REACT_APP_API_NEWS
function App() {

  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const mainUser = useSelector((state) => state.user.users);
  const [plan , setPlan] = useState({})


  const [isLogged, setIsLogged] = useState(false);
  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const newLogin = () => {
    setIsLogged(!isLogged);
  };


  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
  }, [isLogged]);


  useEffect(() => {
    if (user?.id) {
      axios.get(`${API}/plans/${user?.id}/plan`)
        .then((res) => {
          if (res.data) {
            setPlan(res.data);
          } else {
            setPlan(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching plan data:", error);

        });
    }
  }, [user?.id, isLogged]);
  

  useEffect(() => {
       dispatch(fetchUsers(user?.id))
      
    }, [dispatch])


  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <div className={`App ${mainUser?.dark_mode ? "dark_background" : "light_background"}`}>
    <Router>
    <div className="navbar">
        {user ? <Nav user={user} plan={plan} mainUser={mainUser}/> : null}
      </div>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home newLogin={newLogin} isLogged={isLogged} setUser={setUser} user={user}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path={`/profile/${user?.id}`} element={<Profile user={user} plan={plan}/>} />
          <Route path="/posts/:tag_name" element={<SearchPosts mainUser={mainUser}/>}/>
          <Route path={`/posts/:username/:id`} element={<PostsDetails user={user} plan={plan} mainUser={mainUser}/>}/>
          <Route path={`/profiles/:id`} element={<OtherProfile user={user} plan={plan} mainUser={mainUser}/>}/>
          <Route path={`/:id/following`} element={<Followings user={user} mainUser={mainUser}/>}/>
          <Route path={`/:id/follower`} element={<Followers user={user} mainUser={mainUser}/>}/>
          <Route path={`/notifications/:id`} element={<Notifications mainUser={mainUser}/>}/>
          <Route path="/verify" element={<Verification />} />
        </Routes>
      </main>
      <div className={`${mainUser?.dark_mode ? "footer_border_white" : "footer_border_dark"} footer`} style={{ display: screenWidth >= 993 ? 'block' : 'none' }}>
          {user ? <Footer user={user} mainUser={mainUser}/> : null}
        </div>
    </Router>
  </div>
  );
}

export default App;
