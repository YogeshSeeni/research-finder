import React from 'react';
import '../bulma.css';

function ChatMessage (props) {
  return (
    <div class={`level-${props.alignment}`}>
      <div class="level-item level-right">
        <article class="media" style={{width: '25vw'}}>
          <figure className="media-left">
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
      </div>
    </div>
  );
}

export default ChatMessage;
