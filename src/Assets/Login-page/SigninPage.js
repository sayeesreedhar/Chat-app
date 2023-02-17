import React from 'react'
import "./loginpage.css"
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth} from '../Components/Firebase';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Components/Context/UserContext';
const SigninPage = () => {
  const{setuser,setuniuser}=useContext(UserContext);
  const navigate=useNavigate();
  const[err,setErr]=useState("");
  //const{setuser}=useContext(usercontext);
  const handlesignin=async(e)=>{e.preventDefault();const email=e.target[0].value;
  const password=e.target[1].value;console.log(email+" "+password)
  const res=await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem("user",JSON.stringify(user));
    setuniuser(user.uid);
    setuser(JSON.parse(localStorage.getItem("user")));
    navigate("/")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErr("Incorrect email or password entered!");
  });





}
  return (
    <div>
       <div className='formContainer'>
        <div className='formWrapper'>
        <span className='logo'>Chat Now</span>
                <span className='moto'>Let's start a conversation!</span>
                <span>{err}</span>
            <form className='formstyle' onSubmit={handlesignin}>
                <input style={{backgroundColor:"rgba(239, 246, 253, 0.773)",border:"none",borderBottom:"5px solid lightBlue",height:"20px",padding:"10px"}}type="email" placeholder="Username"/>
                <input style={{backgroundColor:"rgba(239, 246, 253, 0.773)",border:"none",borderBottom:"5px solid lightBlue",height:"20px",padding:"10px"}}type="password" placeholder="Password"/>
                <button type="submit" className='signinButton'>Start Chatting</button>
            </form>
            <span style={{"cursor":"pointer"}} className='registerprompt' onClick={()=>{navigate("/register")}}>New to Chat Now?<span className='registerbutton'>Join here</span></span>

        </div>

       </div>

    </div>
  )
}

export default SigninPage