import React from 'react'
import { useNavigate } from 'react-router-dom';
function logoutHandler() {
    localStorage.removeItem('user');
    
    window.location.href = '/channels'
  return (
    <div>
      
    </div>
  )
}

export default logoutHandler
