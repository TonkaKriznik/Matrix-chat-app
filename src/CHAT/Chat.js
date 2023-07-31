import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userActions, messageActions } from "../store.js";
import {FaPlay} from "react-icons/fa";
import {FaPills} from "react-icons/fa";
import './Chat.css';

function Chat(props) {

  const userId = useSelector((state)=> state.user.id);
  const allMessages = useSelector((state)=> state.message.messages);
  const room = props.drone.subscribe('chat-app');
  const username = useSelector((state)=> state.user.username);
  const decision = useSelector((state)=> state.user.color);
   const[text, setText] = useState('');
 

const redColor  = "red" === decision;
const colorBackground = redColor? "chat colorRed":"chat colorBlue"

  const colorDecision= {
    color: decision,
  }

  const dispatch = useDispatch();
   
  useEffect(()=>{
    props.drone.on('open', async(error) => {
      console.log('connected');
      console.log(props.drone);
      dispatch(userActions.setId(props.drone.clientId))
     });
     room.on('open', async(error) => {
      if (error) {
        return console.error(error);
      }
        console.log('connected to room')     
       });
       room.on('message', message => {
        dispatch(messageActions.addMessage(message))
        console.log(message)
      });
  })
    const handleLogout = (e) =>{
        e.preventDefault();
        props.drone.on('close', event => {
          console.log('disconnected');
        });
        props.onLogOut();
        dispatch(userActions.reset());
        console.log('izašli ste');
       } 
       const inputHandler = (e) =>{
          e.preventDefault(); 
        }
        const changeMessage = (event) =>{
          setText(event.target.value);
        } 
        const sendBtn = () =>{
          props.drone.publish({
            room: 'chat-app',
            message: {text,username}
          
          });
         setText('');
         console.log(userId);
        }
        const createMessage = (message) =>{
          const myMessage = userId === message.clientId;
          const messageStyle = myMessage ? "messages myMessage": "messages";
          return(
            <li className={messageStyle} key={Math.random()}> 
              <div className='username' >{message.data.username}:</div>
              <div >{message.data.text}</div>
            </li>
          )
        }
    return (
        <div className={colorBackground}>
          <div className="header" style ={colorDecision}>
              <p className='icon'> <FaPills /></p>
              <p className="red" > {username}</p>
            <button className= "button-85" onClick={handleLogout}>LOGOUT</button>
          </div>
      
        <div className="main">
          <ul className="mainChatScroll">
            {allMessages.map((m)=>{ return createMessage(m)})}
          </ul>
        </div>
  
        <div className="footer">
          <form className="chatForm" onSubmit={inputHandler}>
            <input
            className="textChat"
              type="text"
              placeholder="Type to write ... "
              name="typingText"
              value={text}
              onChange={changeMessage}>
              </input>
            <button className="sendBtn" onClick ={sendBtn}>
            <FaPlay/>
            </button>
          </form>
        </div>
      </div>
    );
         };
        export default Chat;