import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import Chat from './chat/Chat';
import UserList from "./user/UserList";
import {Box} from 'react-bulma-components';

export default function UserHome() {
  const cookies = new Cookies();
  const history = new useHistory();

  if (!cookies.get("uuid")) {
    history.push("/");
  }
  return (
    <article class="media">
      <div class='media-right'>
        <UserList />
      </div>
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
    </article>
  );
}
