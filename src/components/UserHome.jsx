import React, {useState} from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import axios from 'axios';
import Chat from './chat/Chat';
import UserList from "./user/UserList";
import {Box} from 'react-bulma-components';

export default function UserHome(props) {
  const cookies = new Cookies();
  const history = new useHistory();

  const [chatId, setChatId] = useState('sadasdsadadqwdqwd');

  async function handleStartChat(otherUser) {
    const resp = await axios ({
       method:"post",
       url: "https://treasurehacks2021.pythonanywhere.com/v1/chat/id",
       data: {
         sender: cookies.get("uuid"),
         other: otherUser
       },
       headers: {
           "Authorization": cookies.get("id_token")
       }

    });
    if (resp.data.success){
      setChatId(resp.data.json.chat_id);
    }
  }

  if (!cookies.get("uuid")) {
    history.push("/");
  }
  return (
    <article class="media">
      <div class='media-right'  style={{width: '25%'}}>
        <UserList onInitiateChat={handleStartChat}/>
      </div>
      <div class="media-content">
        <div class="content">
          <br></br>
          <Chat chat_id = {chatId} sender={cookies.get("uuid")} id_token={cookies.get("id_token")}/>
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
