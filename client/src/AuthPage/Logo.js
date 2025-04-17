import React from 'react'
import siv from "../resources/images/siv.png"
function Logo({text}) {
  return (
    <div className='auth-form-logo-container'>
      <img src={siv} width={200}/>
      {text}
    </div>
  )
}

export default Logo
