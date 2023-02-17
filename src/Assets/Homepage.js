import React from 'react'
import "./Components/homepage.css"
import Sidebar from "./Components/Sidebar"
import Chats from "./Components/Chats"
import { UserContext } from './Components/Context/UserContext'
import { useContext } from 'react'
const Homepage = () => {
  const{user}=useContext(UserContext);
  console.log(user.uid+" "+user.dispayName);
  
  return (
    <div className='homepage'>
      <div className='container'>
       <Sidebar/>
        <Chats/>

      </div>
    </div>
  )
}

export default Homepage