import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextValue";

const getStoredUser = () => {
    const user = JSON.parse(localStorage.getItem("user")) || null

    if (user?.token && user.token.length > 2000) {
        localStorage.removeItem("user")
        return null
    }

    return user
}

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser ]= useState(
        getStoredUser()
    );

    const updateUser = (data) =>{
        setCurrentUser((previousUser) => {
            if (
                data &&
                previousUser?.token &&
                previousUser.token.length < 2000 &&
                !data.token
            ) {
                return { ...data, token: previousUser.token }
            }

            return data
        })
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
