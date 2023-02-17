import React, { useEffect, useState } from 'react'
import { UserContext } from './Context/UserContext';
import { useContext } from 'react';
import {  doc,onSnapshot } from "firebase/firestore";
import { db } from './Firebase';
import "./homepage.css"

const Messages = () => {
  const{comb,uniuser}=useContext(UserContext);
  const{combinedids,user}=useContext(UserContext);
  const[mesg,setmesg]=useState([]);
  useEffect(()=>{const getChats=()=>{
    const unsub = onSnapshot(doc(db, "chats", combinedids), (doc) => {
      setmesg( doc.data());
     
  });
  return ()=> unsub();
  }
  user.uid&&getChats();
  },[combinedids]);
  return (
    <div><div>{/*console.log(mesg)*/}</div>
    <div style={{"height":"70vh","overflow":"scroll","overflowX":"hidden"}}>{Object.entries(mesg)?.map((cur)=>cur[1].map((cur)=>cur.uid[0]===user.uid?<div className='mymsg' ><div  style={{"textAlign":"left"}}>{cur.content}</div></div>:<div className='omsg'><div style={{"textAlign":"left"}}>{cur.content}</div></div>))}</div>
</div>
  )
}

export default Messages