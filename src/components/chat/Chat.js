import React, {useEffect, useState, useCallback , useRef} from 'react';
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";
import '../bulma.css';
import ChatMessage from './ChatMessage';
import {Container, Box, Button} from 'react-bulma-components';
import axios from 'axios';

function Chat (props) {
  const [chatMessages, setChatMessages] = useState([]);
  const [curMessage, setCurMessage] = useState('');
  const messagesEndRef = useRef(null);

  const db = getDatabase();
  const chatRef = ref(db, 'Messages/' + props.chat_id);

  let userData = {};

  async function sendChatMessage () {
    const resp = await axios ({
       method:"post",
       url: "https://treasurehacks2021.pythonanywhere.com/v1/chat/" + props.chat_id + "/send",
       data: {
         sender: props.sender,
         message: curMessage
       },
       headers: {
           "Authorization": props.id_token
       }

    });
    setCurMessage('');
  }




  const changeChatHandler = (event) => {
    setCurMessage(event.target.value);
  }

  async function updateUserDataIfNeeded(user) {
    if (!userData[user]){
        const thing = await axios ({
           method:"post",
           url: "https://treasurehacks2021.pythonanywhere.com/v1/user/" + user
        });
        if (thing.data.success){
          userData[user] = thing.data.json;
        }
    }
  }

  function getDateTimeFromTimestamp(unixTimeStamp) {
    let date = new Date(unixTimeStamp);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
  }

  const clearChat = useCallback(() => {
    setChatMessages([]);
  }, [props.chat_id]);

  const fetchChatMessagesHandler = useCallback(async () => {

    onChildAdded(chatRef, async (data) => {
      const cur_msg = data.val()
      await updateUserDataIfNeeded(cur_msg.sender);
      setChatMessages((prevState) => {
        return [...prevState, {
          id: data.key,
          message: cur_msg.message,
          sender: userData[cur_msg.sender] ? userData[cur_msg.sender]['first_name'] + " " + userData[cur_msg.sender]['last_name'] : cur_msg.sender,
          uuid: cur_msg.sender,
          time: getDateTimeFromTimestamp(+cur_msg.time * 1000),
          image: userData[cur_msg.sender] ? userData[cur_msg.sender]['profile_pic'] : "https://i.pcmag.com/imagery/reviews/03aizylUVApdyLAIku1AvRV-39.1605559903.fit_scale.size_1028x578.png"
        }]
      })
      try{
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      } catch {

      }

    });
    /*
    const resp = await axios ({
       method:"post",
       url: "https://treasurehacks2021.pythonanywhere.com/v1/chat/" + props.chat_id + "/messages",
       data: {
         sender: props.sender
       },
       headers: {
           "Authorization": props.id_token
       }

    });
    const initialMessages = [];
    if (resp.data.success) {
      const msgs = resp.data.json.data;
      for (var key in msgs){
        initialMessages.push({
          id: key,
          message: msgs[key].message,
          sender: msgs[key].sender,
          time: msgs[key].time
        })
      }
    }
    console.log(resp);
    console.log(initialMessages);
    setChatMessages(initialMessages);
    */

  }, [props.chat_id])

  useEffect(() => {
    clearChat();
  }, [clearChat])

  useEffect(() => {
    fetchChatMessagesHandler();
  }, [fetchChatMessagesHandler])

  return (
    <Container style={{ height: '100%', width: '100%' }}>
      <Box style={{height: '70vh', overflowY: 'auto'}}>
        <ul>
          {chatMessages.map((message) => {
            return <ChatMessage key={message.id} image={message.image} username={message.sender} time_since_message={message.time} body={message.message} alignment={message.uuid===props.sender ? 'right' : 'left'}/>
          })}
        </ul>
        <div ref={messagesEndRef} />
      </Box>
      <Box>
        <textarea className="textarea" placeholder="Say something" rows='2' onChange={changeChatHandler} value={curMessage}></textarea>
        <br></br>
        <Button className="button is-success" onClick={sendChatMessage}>Send</Button>
      </Box>
    </Container>
  );
}

export default Chat;
