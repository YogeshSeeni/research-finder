import React from 'react';
import '../bulma.css';

function ChatMessage (props) {
  return (
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src={props.image}/>
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{props.username}</strong> <small>{props.time_since_message}</small>
            <br></br>
            {props.body}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ChatMessage;
