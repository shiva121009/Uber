import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import { UserDataContext } from "./context/userContext";
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectWrapper";

const App = () => {
  const ans= useContext(UserDataContext)
  return (
 
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/home" element={
          <UserProtectedWrapper>
          <Home/>
        </UserProtectedWrapper>
      }/>
      <Route path= '/user/logout' element={
        <UserProtectedWrapper>
          <UserLogout/>
        </UserProtectedWrapper>
      }/>
      <Route path= '/captain/logout' element={
        <UserProtectedWrapper>
          <CaptainLogout/>
        </UserProtectedWrapper>
      }
          />
          <Route path= "/captain-home" element={
            <CaptainProtectedWrapper>
           <CaptainHome/>
           </CaptainProtectedWrapper>
          }/>

      </Routes>
    
  );
};

export default App;
