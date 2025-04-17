import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../resources/images/siv.png'
import useUserDetails from '../../shared/hooks/useUserDetails';
const NavLogo = () => {
    return(
        <div className="nav-logo-container">
            {/* 100% means the image will be the size of the parent */}
            <img className='nav-logo' width="150%" height="150%" src={logo}/> 
        </div>
    )
};

const NavButton = ({text, onClickHandler}) => {
    return (
        <span className='nav-button' onClick={onClickHandler}>{text}</span>
    )
}
function Nav() {
  const { isLogged, logout } = useUserDetails();
  const navigate = useNavigate();
  const handleNavigateToAuth = () => {
    navigate("/auth");
  }

  const handleNavigateToSettings = () => {
    navigate("/settings");
  }

  const handleLogOut = () => {
    logout();
  }

  const handleNavigateToChannels = () => {
    navigate("/channels");
  }
  return (
    <div className='nav-container'>
      <NavLogo/> 
      <div className='nav-buttons-container'>
        <NavButton text="Siv" onClickHandler={handleNavigateToChannels}/>
        {
          !isLogged ?
          (<NavButton text="Login" onClickHandler={handleNavigateToAuth}/>)
          :
          (<div>
            <NavButton text="My Account" onClickHandler={handleNavigateToSettings}></NavButton>
            <NavButton text="Logout" onClickHandler={handleLogOut}></NavButton>
        </div>)
        }
        
      </div>
    </div>
  )
}

export default Nav
