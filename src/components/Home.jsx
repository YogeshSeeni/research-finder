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
      <section class="hero is-danger is-fullheight-with-navbar">
        <div class="hero-body">
          <div class="">
            <p class="title">Fullheight hero</p>
            <p class="subtitle">Fullheight subtitle</p>
          </div>
        </div>
      </section>
    </div>
  );
}
