import React from 'react';
import '../bulma.css';
import {Box} from 'react-bulma-components';

export default function ResearchPosting (props) {
  return (
    <div class="card">
      <header class="card-header">
        <h1 class="card-header-title">
          {props.title}
        </h1>
      </header>
      <div class="card-content">
        <div class="content">
          {props.body}
        </div>
      </div>
      <footer class="card-footer">
        <button class="button is-primary card-footer-item">Apply</button>
      </footer>
    </div>
  )
}
