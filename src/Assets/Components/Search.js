import React, { useContext, useState } from 'react'
import { collection, query, where,getDoc,getDocs,setDoc,doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from './Firebase';
import { UserContext } from './Context/UserContext';
import "./homepage.css"
const Search = () => {
  const[name,setname]=useState("");
  const[list,setlist]=useState({});
  const{user,settest,combinedids}=useContext(UserContext);
  var y;
  const searchuser=async (e)=>{
    
    if(e.code==="Enter")
    {//const userlist = collection(db, "userChats");
    //console.log("123"+ userlist.parent)
    const q = query(collection(db, "users"), where("name", "==", name));
    try{
    const querySnapshot = await getDocs(q);
    
      querySnapshot.forEach((doc) => {console.log(doc.data());
        setlist(doc.data());
      });}
      catch(e){console.log(e)}
}
  }
 const handleSelect=async()=>{
    const combinedid=user.uid>list.uid?user.uid+list.uid:list.uid+user.uid;
   console.log(combinedids);
    console.log(combinedid+" "+list.uid);
    try{settest(combinedid);const res=await getDoc(doc(db,"chats",combinedid))
    if(!res.exists()){console.log("enter"); 
      await setDoc(doc(db,"chats",combinedid),{messages:[]})
      const curuser=await getDoc(doc(db,"userChats",user.uid))
      const listuser=await getDoc(doc(db,"userChats",list.uid))
      if(curuser.exists())
      await updateDoc(doc(db,"userChats",user.uid),{
        [combinedid+"-userInfo"]:{
          uid:list.uid,
          displayName:list.name,
          photoURL:list.photoURL,
          [combinedid+"-date"]:serverTimestamp()
        }//,
       // [combinedid+"-date"]:serverTimestamp()
      });
      else
      await setDoc(doc(db,"userChats",user.uid),{
        [combinedid+"-userInfo"]:{
          uid:list.uid,
          displayName:list.name,
          photoURL:list.photoURL,
          [combinedid+"-date"]:serverTimestamp()
        }//,
       // [combinedid+"-date"]:serverTimestamp()
      });
      if(listuser.exists())
      await updateDoc(doc(db,"userChats",list.uid),{
        [combinedid+"-userInfo"]:{
          displayName:user.displayName,
          photoURL:user.photoURL,
          uid:user.uid,
          [combinedid+"-date"]:serverTimestamp()
        }//,
        //[combinedid+"-date"]:serverTimestamp()
      });
    else
    await setDoc(doc(db,"userChats",list.uid),{
      [combinedid+"-userInfo"]:{
        displayName:user.displayName,
        photoURL:user.photoURL,
        uid:user.uid,
        [combinedid+"-date"]:serverTimestamp()
      }//,
      //[combinedid+"-date"]:serverTimestamp()
    });
    }
    }
   
    catch(e){console.log(e)}
    setlist(null);
    setname("");
  }
  return (
    <div className='search'>
      <div><input style={{'color':'white'}} onKeyDown={searchuser} onChange={e=>setname(e.target.value)} className="search-bar" value={name} type="text" placeholder='Search a user'/>
      
      {list==null||name==""
      ?<div></div>:<div>
      <div className='chat-list'>
     <div className='chatlistcontainer' onClick={handleSelect}><img className='user-list-profile' src={list.photoURL} alt='load'/><div><span className='username'>{list.name}</span></div>
      </div>
       </div>
       </div>}
      </div>
     
    </div>
  )
}

export default Search