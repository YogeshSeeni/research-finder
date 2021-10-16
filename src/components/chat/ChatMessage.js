import React from 'react';
import '../bulma.css';
import {Box} from 'react-bulma-components';

function ChatMessage (props) {
  return (

    <Box style={{textAlign: props.alignment}}>
      <div class='content'>
        <div class={`level-${props.alignment}`}>
          <div class="level-item">
            <article class="media">
              {props.alignment == 'left' && <figure className={`media-${props.alignment}`}>
                <p class="image is-64x64">
                  <img src={props.image}/>
                </p>
              </figure>}

              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{props.username}</strong> <small>{props.time_since_message}</small>
                    <br></br>
                    <p style={{width: '20vw'}}>{props.body}</p>
                  </p>
                </div>
              </div>
              {props.alignment == 'right' && <figure className={`media-${props.alignment}`}>
                <p class="image is-64x64">
                  <img src={props.image}/>
                </p>
              </figure>}
            </article>
          </div>
        </div>
      </div>
    </Box>

  );
}

export default ChatMessage;
