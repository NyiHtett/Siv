import React from 'react'

function validatePassword(password) {
  const regex = /^\S{6,12}$/;
  return regex.test(password)
}

export default validatePassword
export const passwordValidationMessage = "Please enter a valid password, No space allowed and the number should be between 6 and 12"
