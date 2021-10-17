import React from "react";
import {Box} from 'react-bulma-components';
import '../bulma.css';
import User from './User'


function UserList (props) {
  return (
    <div class='content' style={{height:'95vh', overflowY:'scroll'}}>
      <br></br>
      <Box>
        <User first_name="Matthew" last_name="Chak" field="Expert in everything" image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" experience="Has infinite experience in everything"/>
      </Box>
    </div>
  )
}

export default UserList;
