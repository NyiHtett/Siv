import React from "react";
import { changePassword as changePasswordRequest } from "../../api";
import toast from "react-hot-toast";
function useChangePassword() {
  const changePassword = async (password, newPassword) => {
    const responseData = await changePasswordRequest({
      password,
      newPassword,
    });

    if (responseData.error) {
      return toast.error(
        responseData.exception?.response?.data ||
          "Error occured while trying to change the password"
      );
    }

    toast.success("Password is changed successfully")
  };
  return {
    changePassword
  }
}

export default useChangePassword;
