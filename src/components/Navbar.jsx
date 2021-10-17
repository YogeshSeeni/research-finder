import React from "react";
import Cookies from "universal-cookie";
import logo from "./Research-Finder-Logo.png"

export default function Navbar() {
  const cookies = new Cookies();

  return (
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://github.com/YogeshSeeni/research-finder/tree/2f42b45a3c17bf704f9f58a1f3546e602b3fc057">
          <img
            src={logo}
          />
        </a>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      {cookies.get("uuid") != undefined ? (
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start ml-0">
          <a class="navbar-item" href="/projects">
              Projects
            </a>
            <a class="navbar-item" href="/userhome">
              Chat
            </a>
          </div>

          <div class="navbar-end mr-0">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-light" href="/profile">
                  Profile
                </a>
                <a class="button is-light" href="/logout">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {cookies.get("uuid") == undefined ? (
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start ml-0">
            <a class="navbar-item" href="/">
              Home
            </a>
          </div>

          <div class="navbar-end mr-0">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary" href="/register">
                  <strong>Register</strong>
                </a>
                <a class="button is-light" href="/login">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
