import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as registerRequest } from '../../api'
function useRegister() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate() // use to navigate between the pages


    const register = async(email, password, username) => {
        setIsLoading(true);
        const response = await registerRequest({
            email, 
            password,
            username,
        })
        setIsLoading(false);

        if(response.error) {
            return console.log(response.error);
        }

        const { userDetails } = response.data;
        localStorage.setItem('user', JSON.stringify(userDetails)) //locally store the data
        navigate('/');
    }
  return {
    register, 
    isLoading
  }
}

export default useRegister
