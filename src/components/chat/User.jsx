import React from 'react'

export default function User(props) {
    return (
        <div class="">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src={props.imageURL} alt="Image"/>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{props.name}</strong> <small>{props.field}</small>
          <br/>
          {props.experience}
        </p>
      </div>
    </div>
  </article>
</div>
    )
}
