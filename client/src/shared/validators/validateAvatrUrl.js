import React from 'react'

function validateAvatrUrl(url) {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

export default validateAvatrUrl;
export const urlValidationMessage = "Please enter a valid url"
