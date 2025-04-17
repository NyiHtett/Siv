import React from 'react'

function validateDescription(description) {
  return (description.length >= 10 && description.length <= 200);
}

export default validateDescription;
export const descriptionValidationMessage = "Description should have between 10 and 200 characters"
