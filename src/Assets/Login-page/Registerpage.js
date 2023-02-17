import React, { useState } from 'react'
import { auth,storage,db } from '../Components/Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {  createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { Navigate, useNavigate } from 'react-router-dom';
import "./loginpage.css"
const Registerpage = () => {
  const[msg,setMsg]=useState("");
  const navigate=useNavigate();
  const handleSubmit=async (e)=>{e.preventDefault();console.log(e.target[0].value);
   const fullname=e.target[0].value;
    const email=e.target[1].value;
   const password=e.target[2].value;
   const phone=e.target[3].value;
   const profilepic=e.target[4].files[0];
   
    var picdetails;
const res= await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   
    const user = userCredential.user;
    console.log(user);setMsg("User details registered successfully");
    const storageRef = ref(storage, "users/"+user.uid);

const uploadTask =  uploadBytesResumable(storageRef, e.target[4].files[0]);


uploadTask.on('state_changed', 
  (snapshot) => {

    
  }, 
  (error) => {
    setMsg("Error uploading profile picture");
  }, 
  async () => {
    
   await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      console.log('File available at', downloadURL);picdetails=downloadURL;
      await updateProfile(user,{displayName:fullname,photoURL:downloadURL})
    });
    await setDoc(doc(db, "users", user.uid), {
      uid:user.uid,
      name: fullname,
      mobile:phone,
      photoURL: picdetails
    });
    await setDoc(doc(db, "userChats", user.uid),{});  navigate("/signin");
  }
 
);

  })
  .catch((error) => {
    console.log(error);setMsg("Email id or password entered is not valid");
    
  });}
  return (
    <div>
       <div className='formContainer'>
        <div className='formWrapper'>
        <span className='logo'>Chat Now</span>
                <span className='moto'>Registration form</span><span>{msg}</span>
            <form className='formstyle' onSubmit={handleSubmit}>
            <input style={{backgroundColor:"rgba(239, 246, 253, 0.773)",border:"none",borderBottom:"5px solid lightBlue",height:"20px",padding:"10px"}}type="text" placeholder="Full name"/>
                <input style={{backgroundColor:"rgba(239, 246, 253, 0.773)",border:"none",borderBottom:"5px solid lightBlue",height:"20px",padding:"10px"}}type="email" placeholder="Email"/>
                <input style={{backgroundColor:"rgba(239, 246, 253, 0.773)",border:"none",borderBottom:"5px solid lightBlue",height:"20px",padding:"10px"}}type="password" placeholder="Password"/>
                <input style={{backgroundColor:"rgba(239, 246, 253, 0.773)",border:"none",borderBottom:"5px solid lightBlue",height:"20px",padding:"10px"}}type="phone" placeholder="Phone number"/>
                <input id="pic" style={{visibility:"hidden",marginTop:"-35px"}}type="file" placeholder="Profile picture"/>
                <label htmlFor='pic' style={{cursor:"pointer",display:"flex",alignItems:"center"}}><img className="profilepic" src="add-profile-pic.png" alt="avatar"/>Add a profile picture</label>
                <button type="submit" className='signinButton'>Register</button>
            </form>
            <span style={{"cursor":"pointer"}} className='registerprompt' onClick={()=>navigate("/signin")}>Have an account?<span className='registerbutton'>Login here</span></span>

        </div>

       </div>

    </div>
  )
}

export default Registerpage