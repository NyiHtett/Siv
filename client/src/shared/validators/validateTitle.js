import React from 'react'

function validateTitle(title) {
  return (title.length >= 3 && title.length <= 30);
}

export default validateTitle;
export const titleValidationMessage = "Title should have between 3 and 30 characters"
