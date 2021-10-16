import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import Chat from './chat/Chat';

export default function UserHome() {
  const cookies = new Cookies();
  const history = new useHistory();

  if (!cookies.get("uuid")) {
    history.push("/");
  }
  return (
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <br></br>
          <Chat chat_id = 'test' sender={cookies.get("uuid")} id_token={cookies.get("id_token")}/>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small">
                <i class="fas fa-reply"></i>
              </span>
            </a>
            <a class="level-item">
              <span class="icon is-small">
                <i class="fas fa-retweet"></i>
              </span>
            </a>
            <a class="level-item">
              <span class="icon is-small">
                <i class="fas fa-heart"></i>
              </span>
            </a>
          </div>
        </nav>
      </div>
      <div class="media-right">
        <button class="delete"></button>
      </div>
    </article>
  );
}
