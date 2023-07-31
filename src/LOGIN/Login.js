import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store.js";
import {FaPills} from "react-icons/fa";
import './Login.css';


function Login (props) {
  
  const changedUsername = useSelector((state)=> state.user.username);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [decision, setDecision] = useState('red');
  const style1 = {color: "rgba(202, 17, 17, 0.9)", fontSize:"1.5em", marginRight:"25px" };
  const style2 = {color: "rgba(4, 23, 200, 0.9)", fontSize:"1.5em",  marginRight:"25px"};
  
  
  const handleChange =(event) => {
    setDecision(event.target.value);
  }
  const handleLogin = (event) => {
    event.preventDefault();
    if (username) {
      setLoggedIn(true);
      console.log(`User ${username} logged in`);
      props.onSubmit();
      dispatch(userActions.username(username));
      dispatch(userActions.color(decision));
      console.log("ovo je u storu " + changedUsername)
    } else {
      
      alert("Please enter username to log in :)");
      console.log("Please enter a username to log in");
    }
  };

  return (
    <div className="Login">
    <form>
      <label className='formLabel'>
      MAKE YOUR DECISION:
        <br/>
        <input className="usernameInput" type="text" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br/>
      <div className="radioLabel">
        <input type="radio" id="red" className="redPill" value="red" checked={decision === 'red'}
          onChange={handleChange}/>
          <label for="red"><FaPills style={style1}/></label>
        <input type="radio" id="blue" className="bluePill" value="blue" checked={decision === 'blue'}
          onChange={handleChange}/>
        <label for="blue"><FaPills style={style2}/></label>
        </div>
        <br/>
      <button className= "button-85"onClick={handleLogin}>LOGIN</button>
      {loggedIn && <p>Welcome, {username}!</p>}
    </form>
    </div>
  );
};

export default Login;




