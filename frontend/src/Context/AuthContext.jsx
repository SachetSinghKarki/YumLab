import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextValue";

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser ]= useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const updateUser = (data) =>{
        setCurrentUser(data)
    }

    useEffect (() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser))
        } else {
            localStorage.removeItem("user")
        }
    },[currentUser])

    return(
        <AuthContext.Provider value ={{currentUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
};
