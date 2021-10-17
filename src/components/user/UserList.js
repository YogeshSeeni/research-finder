import React, {useCallback, useState, useEffect} from "react";
import {Box} from 'react-bulma-components';
import axios from 'axios';
import '../bulma.css';
import User from './User'


function UserList (props) {

  const [userData, setUserData] = useState([]);

  const fetchUserDataHandler = useCallback(() => {
    const data = axios ({
      method: "post",
      url: "https://treasurehacks2021.pythonanywhere.com/v1/user"
    }).then(data => {
      for (var key in data.data.json){
        setUserData((prevState) => {
          return [data.data.json[key], ...prevState]
        })
      }
      console.log(userData);
    });


  }, [])

  useEffect(() => {
    fetchUserDataHandler();
  }, [fetchUserDataHandler])

  return (
    <div class='content' style={{height:'95vh', overflowY:'scroll'}}>
      <br></br>
      {userData.map((user) => {
        return (
          <Box>
            <User key={user.uuid} onInitiateChat={props.onInitiateChat} first_name={user.first_name} last_name={user.last_name} field_of_study={user.field_of_study} image={user.profile_pic} experience={user.experience} uuid={user.uuid}/>
          </Box>
        )

      })}

    </div>
  )
}

export default UserList;
