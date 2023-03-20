import logo from './logo.svg';
import React,{useState,useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from "./component/login_component"
import Signup from "./component/signup_component"
import Reset from "./component/reset"
import UserDetails from "./component/userDetails"
import Home from './component/home';
import Dashboard from './component/dashboard';



function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn")
 
  const [admin, setAdmin] = useState(false);

  useEffect(()=> {
    fetch("http://localhost:8000/userData", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "Application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token"),
        }),
    }).then((res)=> res.json())
    .then((data)=> {
        console.log(data, "UserData");
        if(data.data.userType === "Admin") {
            setAdmin(true)
        }

      
    }); 
}, []);
  
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/home'}>
              Home
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {isLoggedIn=="true"?null:<li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>}
                
                {isLoggedIn=="true" && admin? <li className="nav-item">
                  <Link className="nav-link" to={'/dash'}>
                    Dashboard
                  </Link>
                </li>:null}
               
                {isLoggedIn=="true"?null:<li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>}
                
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={isLoggedIn == "true" ? <UserDetails/> : <Login/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/reset" element={<Reset/>} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              
              <Route path="/user-detail" element={<UserDetails/>} />
            <Route path="/dash" element={<Dashboard/>} />
             
              
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
