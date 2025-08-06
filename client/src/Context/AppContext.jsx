import axios from 'axios';
import { useEffect } from 'react';
import { createContext, useState } from "react";
import { toast } from 'react-toastify'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setuserData] = useState(false);

  const getAuthState = async ()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
      if(data.success){
        setIsLoggedin(true)
        getUserData()
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

 const getUserData = async () => {
  try {
    const { data } = await axios.get(backendUrl + '/api/user/data');
    if (data.success) {
      setuserData(data.userData);
    } else {
      toast.error(error.message);
    }
  } catch (error) {
    // ✅ Use error?.response?.data?.message or fallback
    toast.error(error?.response?.data?.message || 'Failed to fetch user data');
  }
};




useEffect(()=>{
  getAuthState();

},[])

  const value = {
    backendUrl,
    isLoggedin, setIsLoggedin,
    userData, setuserData,
    getUserData

  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
