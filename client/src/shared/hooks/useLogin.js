import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../api";
import toast from "react-hot-toast";
function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // use to navigate between the pages

  const login = async (email, password) => {
    setIsLoading(true);
    const response = await loginRequest({
      email,
      password,
    });
    setIsLoading(false);

    if (response.error) {
      return toast.error(
        //error from the server side
        response.exception?.response?.data ||
          "Error occured while signing up. Please try again"
      );
    }

    const { userDetails } = response.data;
    localStorage.setItem("user", JSON.stringify(userDetails)); //locally store the data
    navigate("/");
  };
  return {
    login,
    isLoading,
  };
}

export default useLogin;
