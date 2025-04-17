import React from 'react'

function validateUsername(username) {
  //length should be between 3 and 8 characters. 
  const regex = /^\S{3,8}$/;
  return regex.test(username);
}

export default validateUsername
export const usernameValidationMessage = "Username should be between 3 and 8, No spaces are allowed"