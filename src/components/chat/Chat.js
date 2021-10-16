import React, {useEffect, useState, useCallback} from 'react';
import '../bulma.css';
import ChatMessage from './ChatMessage';
import {Container} from 'react-bulma-components';

function Chat (props) {
  const [chatMessages, setChatMessages] = useState([]);
  const fetchChatMessagesHandler = useCallback(async (start_time, end_time) => {
    //fetch chat messages from API (todo)
    setChatMessages([{
      id: 1,
      image: "https://i.pcmag.com/imagery/reviews/03aizylUVApdyLAIku1AvRV-39.1605559903.fit_scale.size_1028x578.png",
      username: "NotPhysBoom",
      time_since_message: "31s",
      body: "Lorem ipsum idk wtf goes here sipsum"
    }, {
      id: 2,
      image: "https://i.pcmag.com/imagery/reviews/03aizylUVApdyLAIku1AvRV-39.1605559903.fit_scale.size_1028x578.png",
      username: "PhysBoom",
      time_since_message: "31s",
      body: "message2"
    }, {
      id: 3,
      image: "https://i.pcmag.com/imagery/reviews/03aizylUVApdyLAIku1AvRV-39.1605559903.fit_scale.size_1028x578.png",
      username: "PhysBoom",
      time_since_message: "12132s",
      body: "message2"
    }])
  }, [])

  useEffect(() => {
    fetchChatMessagesHandler(16902903912,12390123012012);
  }, [fetchChatMessagesHandler])

  return (
    <Container>
      {chatMessages.map((message) => {
        return <ChatMessage key={message.id} image={message.image} username={message.username} time_since_message={message.time_since_message} body={message.body} alignment={message.username==='PhysBoom' ? 'right' : 'left'}/>
      })}
    </Container>
  );
}

export default Chat
