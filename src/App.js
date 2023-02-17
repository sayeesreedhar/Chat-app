import Homepage from "./Assets/Homepage";
import Registerpage from "./Assets/Login-page/Registerpage";
import SigninPage from "./Assets/Login-page/SigninPage";
import {createBrowserRouter,RouterProvider,Route,Link, BrowserRouter, Routes,} from "react-router-dom";
import {UserContext} from "./Assets/Components/Context/UserContext"
import { useState } from "react";
function App() {
  const[user,setuser]=useState({});
  const[comb,setcomb]=useState({});
  const[combinedids,settest]=useState();
  const[uniuser,setuniuser]=useState("");
  return (
    <div>
      <UserContext.Provider value={{user,setuser,comb,setcomb,combinedids,settest,uniuser,setuniuser}}>
      <BrowserRouter>
      <Routes>
      <Route path="/"/>
      <Route index element={user?<Homepage/>:<SigninPage/>}/>
      <Route path="/signin" element={<SigninPage/>}/>
      <Route path="/register" element={<Registerpage/>}/>


      </Routes>
      </BrowserRouter></UserContext.Provider>
      {/*<SigninPage/>*/}
      {/*<Registerpage/>*/}
      {/*<Homepage/>*/}
    </div>
  );
}

export default App;
