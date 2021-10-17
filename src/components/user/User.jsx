import React from 'react'

export default function User(props) {
    return (
      <div class="card" style={{width: '100%'}}>
        <div class="card-content">
            <div class="tile is-ancestor">
              <div class="tile is-2 is-vertical is-parent">
                <div class="tile is-child">
                  <img src={props.image} width='100vh'></img>
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child">
                  <p class="title">{`${props.first_name} ${props.last_name}`}</p>
                  <p><strong>Studies:</strong>{` ${props.field_of_study}`}</p>
                  <p>
                    {props.experience}
                  </p>

                </div>
              </div>
            </div>
        </div>

        <footer class="card-footer">
          <button class="button is-primary card-footer-item">Chat</button>
        </footer>



      </div>
    )
}
