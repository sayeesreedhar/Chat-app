import React, { useState,useContext } from 'react'
import { collection, query, where,getDoc,getDocs,arrayUnion,doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from './Firebase';
import { UserContext } from './Context/UserContext';
import "./homepage.css"
const Input_msg = () => {
  const[msg,setmsg]=useState("");
  const[det,setdet]=useState("");
  const{combinedids,user,uniuser}=useContext(UserContext);
  const handlemsg=async()=>{try{console.log(combinedids)
    const message = doc(db, "chats",combinedids);
   //console.log(message)
// Atomically add a new region to the "regions" array field.
setdet(user.uid);console.log(uniuser)
await updateDoc(message, {
    messages:arrayUnion({uid:[det],content:msg})
});setmsg("")}
catch(e){console.log(e);}
  }
  return (
    <div className='input-container'>
      <input onChange={(e)=>{setmsg(e.target.value)}} type="text" className='inputmsg' value={msg} placeholder='Type a message...'/>
      <button className="sendbutton" onClick={handlemsg}>Send</button>
    </div>
  )
}

export default Input_msg