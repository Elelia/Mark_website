import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({userId: '', isAdmin: ''});

    const login = (id, admin) => {
        setUser({userId: id, isAdmin: admin});
    };

    const logout = () => {
        setUser({userId: '', isAdmin: ''});
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
