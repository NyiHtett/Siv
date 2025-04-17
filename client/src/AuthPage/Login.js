import React, { useState } from "react";
import Logo from "./Logo";
import Input from "../shared/components/Input";
import validateEmail, { emailValidationMessage } from "../shared/validators/validateEmail";
import validatePassword, { passwordValidationMessage } from "../shared/validators/validatePassword";
import useLogin from "../shared/hooks/useLogin";
export default function Login({ switchAuthHandler }) {
  const {login, isLoading} = useLogin();
  const [formState, setFormState] = useState({
    email: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

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
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }

    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault(); // prevent normal behaviour of web when we submit the form
    login(formState.email.value, formState.password.value)
  };

  //button is disabled when password or email is not valid or data is still being fetched
  const isSubmitButtonDisabled  = !formState.password.isValid || !formState.email.isValid || isLoading


  return (
    <div className="login-container">
      <Logo text={"Log in"} />
      <form className="auth-form">
        <Input
          field="email"
          label="Email"
          value={formState.email.value}
          onChangeHander={handleInputValueChange}
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.email.showError}
          validationMessage={emailValidationMessage}
        />
        <Input
          field="password"
          label="Password"
          value={formState.password.value}
          onChangeHander={handleInputValueChange}
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.password.showError}
          validationMessage={passwordValidationMessage}
        />
        <button
        onClick = {handleLogin}
        disabled = {isSubmitButtonDisabled}
      >Log in</button>
      </form>
      
      <span className="auth-form-switch-label" onClick={switchAuthHandler}>
        Don't have an account ? Please Sign Up
      </span>
    </div>
  );
}
