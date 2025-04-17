import React, { useState } from "react";
import Logo from "./Logo";
import Input from "../shared/components/Input";
import validateEmail, {
  emailValidationMessage,
} from "../shared/validators/validateEmail";
import validatePassword, {
  passwordValidationMessage,
} from "../shared/validators/validatePassword";
import validateUsername, {
  usernameValidationMessage,
} from "../shared/validators/validateUsername";
import validatePasswordConf, {
  passwordConfValidationMessage,
} from "../shared/validators/validatePasswordConf";
import useRegister from "../shared/hooks/useRegister";
export default function Register({ switchAuthHandler }) {
  const { isLoading, register } = useRegister();
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
    username: {
      value: "",
      isValid: false,
      showError: false,
    },
    passwordConf: {
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
      case "username":
        isValid = validateUsername(value);
        break;
      case "passwordConf":
        isValid = validatePasswordConf(formState.password.value, value);
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


  const handleRegister = (event) => {
    event.preventDefault();
    register(
      formState.email.value,
      formState.password.value,
      formState.username.value
    );
  };

  const isSubmitButtonDisabled = 
    !formState.password.isValid ||
    !formState.email.isValid ||
    !formState.username.isValid ||
    !(formState.password.value === formState.passwordConf.value) ||
    isLoading
    ;

  console.log(formState);
  return (
    <div className="register-container">
      <Logo text={"Sign Up"} />
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
        <Input
          field="username"
          label="Username"
          value={formState.username.value}
          onChangeHander={handleInputValueChange}
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.email.showError}
          validationMessage={usernameValidationMessage}
        />
        <Input
          field="passwordConf"
          label="Password Confirmation"
          value={formState.passwordConf.value}
          onChangeHander={handleInputValueChange}
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.email.showError}
          validationMessage={passwordConfValidationMessage}
        />
        <button 
        onClick={handleRegister}
        disabled={isSubmitButtonDisabled}>
          Register
        </button>
      </form>

      <span className="auth-form-switch-label" onClick={switchAuthHandler}>
        Already have an account ? Sign in
      </span>
    </div>
  );
}
