import React from "react";

export default function Project(props) {
  return (
    <div>
      <div class="card mx-6 mt-4">
      <header class="card-header">
        <p class="card-header-title is-centered">
          {props.title}
        </p>
      </header>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  src={props.imgURL}
                  height="48"
                  width="48"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{props.name}</p>
              <p class="subtitle is-6">{props.field}</p>
            </div>
          </div>

          <div class="content has-text-centered">
            {props.description}
            <br />
            <time datetime="2016-1-1">{props.time}</time>
            <br />
            <button class="button is-primary mt-3">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
