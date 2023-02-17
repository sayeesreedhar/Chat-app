import React, { useState } from 'react';
import { UserContext } from './Context/UserContext';
import { useContext,useEffect } from 'react';
import {  doc,onSnapshot } from "firebase/firestore";
import { db } from './Firebase';
const val=[ {src:"jermy.jpg",user:"Test",msg:"Hello world!"},{src:"trump.jpg",user:"Test",msg:"Hello world!"},{src:"button.jpg",user:"Test",msg:"Hello world!"}]
const UserMsg = () => {
  const{user}=useContext(UserContext);
  const{setcomb,settest}=useContext(UserContext);
  const[chats,setChats]=useState([]);
 useEffect(()=>{const getChats=()=>{
    const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
      setChats( doc.data());
     
  });
  return ()=> unsub();
  }
  user.uid&&getChats();
  },[user.uid]);

  
  
  return (<div >
    {/*<div className='chat-list'>
     <div className='chatlistcontainer'><img className='user-list-profile' src='add-profile-pic.png' alt='load'/><div><span className='username'>Ram</span><p className='usermsg'>Hello there!</p></div>
     
     </div> 
  
    </div>*/}
    {chats!=null?Object.entries(chats)?.map((cur)=>(<div className='chat-list' key={cur[0]} onClick={()=>{setcomb(cur[1]);const combinedid=user.uid>cur[1].uid?user.uid+cur[1].uid:cur[1].uid+user.uid;settest(combinedid)}}>
     <div className='chatlistcontainer'><img className='user-list-profile' src={cur[1].photoURL} alt='load'/><div><span className='username'>{cur[1].displayName}</span><p className='usermsg'>{cur.msg}</p></div>
     
     </div> 
  </div>)):<div></div>}
    {/*val.map((cur)=>(<div className='chat-list'>
     <div className='chatlistcontainer'><img className='user-list-profile' src={cur.src} alt='load'/><div><span className='username'>{cur.user}</span><p className='usermsg'>{cur.msg}</p></div>
     
     </div> 
  </div>))*/}
  
    
    </div>
  )
}

export default UserMsg