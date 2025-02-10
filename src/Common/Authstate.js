//Authstate.js

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Authstate = createContext();

export const AuthProvider = ({children}) => {
    const [isUserClicked, setIsUserClicked] = useState(false);
    const [user, setUser] = useState(null);

    // 로그인 시 호출되는 함수
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("유저 데이터:", userData)
    };

    // 로그아웃 시 호출되는 함수
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    // 새로고침해도 로그인 유지
    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser (JSON.parse(storedUser));
        }
    },[]);

    return (
        <Authstate.Provider value={{user, login, logout, isUserClicked, setIsUserClicked}}>
            {children}
        </Authstate.Provider>
    );
};

export const useAuth = () => useContext(Authstate);