import React from 'react'

function Input({
    field, 
    label,
    value,
    onChangeHander,
    type,
    showErrorMessage, 
    validationMessage,
    onBlurHandler,
    textarea,
}) {

    const handleChangeHander = (e) => {
        onChangeHander(e.target.value, field);
    }

    const handleInputBlur = (e) => {
        onBlurHandler(e.target.value, field);
    }
  return (
    <>
    <div className='auth-form-label'>
      <span>{label}</span>
    </div>
    {textarea ? (
      <textarea
      type = {type}
      value = {value}
      onChange={handleChangeHander}
      onBlur={handleInputBlur}
      row ={5}
      style = {{maxWidth: "400px"}}
      />
    ) 
    : (<>
    <input
      type = {type}
      value = {value}
      onChange={handleChangeHander}
      onBlur={handleInputBlur}
    ></input>
    </>)
  }
    <span className='auth-form-validation-message'> 
        {showErrorMessage && validationMessage}
    </span>
    </>
  )
}

export default Input
