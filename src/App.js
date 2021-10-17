import React from 'react';
import { initializeApp } from "firebase/app";



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserHome from './components/UserHome';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Projects from './components/Projects';


// const firebaseConfig = {
//   apiKey: process.env.REACT_
// }
function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDuqjzjQ4IoN5RHq2ltBEHNnMLkhPbzjcw",
    authDomain: "research-finder-9f54c.firebaseapp.com",
    databaseURL: "https://research-finder-9f54c-default-rtdb.firebaseio.com",
    projectId: "research-finder-9f54c",
    storageBucket: "research-finder-9f54c.appspot.com",
    messagingSenderId: "462814299078",
    appId: "1:462814299078:web:8b00fd4896664e88d128c7",
    measurementId: "G-QTKHBEPPZ4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return (
    <Router>
      < Navbar />
      <div>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/userhome">
            <UserHome />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/projects">
            <Projects />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
