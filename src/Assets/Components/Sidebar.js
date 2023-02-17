import React from 'react'
import "./homepage.css"
 import Navbar from "./Navbar" 
 import Search from './Search'
import UserMsg from './UserMsg'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
     <div className='chat-tab'> <Search/>
     <div> <UserMsg/></div></div>
    </div>
  )
}

export default Sidebar