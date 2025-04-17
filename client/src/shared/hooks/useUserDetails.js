import React, { useState } from 'react'
import logoutHandler from '../utils/logout';
const getUserDetails = () => {
    const userDetails = localStorage.getItem('user')
    if(userDetails) {
        return JSON.parse(userDetails);
    }

    return null;
}
function useUserDetails() {
    const [userDetails, setUserDetails] = useState(getUserDetails())
    const logout = () => {
        logoutHandler();
    }
  return {
    isLogged: Boolean(userDetails), //return isLogged as boolean of the object
    username: userDetails?.username ? userDetails.username : "Guest",
    logout,
  }
}

export default useUserDetails
