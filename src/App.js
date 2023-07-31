import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { userActions } from "./store.js";
import Login from './LOGIN/Login.js';
import Chat from './CHAT/Chat.js';
import './App.css';

function App() {

  const drone = new window.Scaledrone('rRKKNSRHxhIHIEfT');
  const dispatch = useDispatch();
  const [userActive, setUserActive] = useState(false);

  const onSubmit=() =>{
    
    setUserActive(true);
    console.log(userActive);
    dispatch(userActions.isActive(1));
  }
  drone.on('close', event => {
    console.log('disconnected');
  });
  const handleLogout =() =>{
    setUserActive(false);
    drone.close();
  }

    if(!userActive){ 
      return(
    <div className="App">
     <Login onSubmit={onSubmit}/>
    </div>)}
      else{ return(
    <div className="App">
     <Chat onLogOut={handleLogout} drone={drone}/>
    </div>
  )
}
}

export default App;
