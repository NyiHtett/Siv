import React, { useState } from 'react'
import validatePassword, { passwordValidationMessage } from '../../../shared/validators/validatePassword';
import Input from '../../../shared/components/Input';
import useChangePassword from '../../../shared/hooks/useChangePassword';


const inputs = [
    {
      field: "password",
      label: "Current password",
      validationMessage: passwordValidationMessage,
      type: "password",
    },
    {
        field: "newPassword",
        label: "New password",
        validationMessage: passwordValidationMessage,
        type: "password",
      },
  ];


function PasswordSettings() {

    const [formState, setFormState] = useState({
        password: {
            isValid: false,
            showError: false,
            value: '',
        },
        newPassword: {
            isValid: false,
            showError: false,
            value: '',
        }
    });

    const { changePassword } = useChangePassword();

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
          ...prevState,
          [field]: {
            ...prevState[field],
            value,
          },
        }));
      };
    
      const handleInputValidationOnBlur = (value, field) => {
        let isValid = validatePassword(value);
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
              ...prevState[field],
              isValid,
              showError: !isValid,
            },
          }));
     }

    
  const isSubmitButtonDisabled = !formState.password.isValid || !formState.newPassword.isValid;
  const handleFormSubmit = (e) => {
    e.preventDefault();

    changePassword(formState.password.value, formState.newPassword.value);
  }
  return (
    <form className='settings-form'>
      {inputs.map(input => (
        <Input
            key = {input.field}
            field={input.field}
            label = {input.label}
            value = {formState[input.field].value}
            onBlurHandler={handleInputValidationOnBlur}
            onChangeHander={handleInputValueChange}
            showErrorMessage={formState[input.field].showError}
            validationMessage={input.validationMessage}
            type = {input.type}    
        />
      ))}
      <button disabled={isSubmitButtonDisabled} onClick={handleFormSubmit}> Save Changes </button>
    </form>
  )
}

export default PasswordSettings
