import React from "react";
import Cookies from "universal-cookie";

export default function Navbar() {
  const cookies = new Cookies();

  return (
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
    {cookies.get("uuid") !=  undefined ? <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <a class="navbar-item" href="/userhome">
        Chat
      </a>
      <a class="navbar-item" href="/profile">
        Profile
      </a>
      <a class="navbar-item" href="/projects">
        Projects
      </a>
    </div>
    
    <div class="navbar-start">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-light" href="/logout">
            Logout
          </a>
        </div>
      </div>
    </div>
  </div>: null}
  {cookies.get("uuid") == undefined ? <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <a class="navbar-item" href="/">
        Home
      </a>
    </div>
    
    <div class="navbar-start">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary mr-2" href="/register">
            <strong>Register</strong>
          </a>
          <a class="button is-light" href="/login">
            Login
          </a>
        </div>
      </div>
    </div>
  </div> : null} 
</nav>
  );
}
