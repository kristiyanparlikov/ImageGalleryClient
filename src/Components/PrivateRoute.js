import React, {useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const { user, setUser } = useContext(UserContext);
    
  return user ? children : <Navigate to="/signin"/> 
}

export default PrivateRoute