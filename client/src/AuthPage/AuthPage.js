import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';
import './authPage.css'
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const handleAuthPageToggle = () => {
    setIsLogin(prevValue => !prevValue);
  }
  return (
    <div className='auth-container'>
      {isLogin ? <Login
      switchAuthHandler = {handleAuthPageToggle}
      /> : <Register
      switchAuthHandler = {handleAuthPageToggle}
      />}
    </div>
  )
}
