import React from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";

export default function Home() {
  const cookies = new Cookies();
  const history = new useHistory();

  if (cookies.get("uuid")) {
    history.push("/userhome");
  }

  return (
    <div>
      <section class="hero is-success is-fullheight-with-navbar">
        <div class="hero-body">
          <div class="">
            <p class="title">Hey There.</p>
            <p class="subtitle">This is a website to help connect students with professionals. Start by registering, so you can explore a multitude of research opportunities.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
