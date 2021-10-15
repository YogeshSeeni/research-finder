import React from "react";

export default function Navbar() {
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

  <div id="navbarBasicExample" class="navbar-menu">
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
  </div>
</nav>
  );
}
