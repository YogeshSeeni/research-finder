import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import Chat from './chat/Chat';
import User from "./chat/User";

export default function UserHome() {
  const cookies = new Cookies();
  const history = new useHistory();

  if (!cookies.get("uuid")) {
    history.push("/");
  }
  return (
    <article class="media">
      <User name="Yogesh Seenichamy" field="Expert in everything" imageURL="https://pbs.twimg.com/profile_images/1387352002020081669/qo9a2Ics.jpg" experience="Has infinite experience in everything"/>
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
