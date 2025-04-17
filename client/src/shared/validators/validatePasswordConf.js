import React from 'react'

function validatePasswordConf(pass, confPass) {
  return (pass === confPass);
}

export default validatePasswordConf
export const passwordConfValidationMessage = "Password is not matched";