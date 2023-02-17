import React, { useEffect } from 'react'
import "./homepage.css"
import { UserContext } from './Context/UserContext'
import { useContext } from 'react'
import { onAuthStateChanged,signOut } from 'firebase/auth'
import { auth } from './Firebase'
import { Navigate,useNavigate } from 'react-router-dom'
const Navbar = () => {
  const{user,setuser}=useContext(UserContext);
  const navigate=useNavigate();
  useEffect(()=>{onAuthStateChanged(auth,(user)=>{setuser(user)});},[])
  
  return (
    <div className='navbar'>
   <div className='nav-logo'>We Chat</div>
   <div className='user-info'><span className='profile-img'><img className='pic' src={user.photoURL} alt="profile=pic"/>{user.displayName}</span><button onClick={()=>{signOut(auth); navigate("/signin")}} className='logout-button'>Logout</button></div>
    </div>
  )
}

export default Navbar