import React from 'react'

function validateEmail(email) {
  const regex = /\S+@\S+\.\S+$/;
  return regex.test(email);
}

export default validateEmail
export const emailValidationMessage = "Please enter a valid email address"