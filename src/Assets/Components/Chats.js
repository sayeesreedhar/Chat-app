import React from 'react'
import "./homepage.css"
import Input_msg from "./Input_msg"
import Messages from './Messages'
import { useContext } from 'react'
import { UserContext } from './Context/UserContext'
const Chats = () => {
  const{comb}=useContext(UserContext);
  return (
    <div className='chats'>
     <div className='chatinfo'>
      <span><img className='chatprofilepic' src={comb.photoURL} alt='profile'/></span>
      <span>{comb.displayName}</span>
     </div>
     <div>
      <div style={{height:"70vh"}}><Messages/></div>
      <Input_msg/>
     </div>

    </div>
  )
}

export default Chats