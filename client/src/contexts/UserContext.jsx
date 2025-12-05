import { useState } from 'react';
import { createContext } from 'react';
import { fetchAllUsers } from '../services/usersServices'; 

const UserContext = createContext({
    isAuthenticated: false,
    user: null,
    loginHandler: () => { },
    logoutHandler: () => { },
});

export function UserProvider({
    children,
}) {
    const [user, setUser] = useState(null);

    const loginHandler = async (email, password) => {
        const allUsers = await fetchAllUsers();
        console.log(`Logging in with Email: ${email}, Password: ${password}`);

        const user = allUsers.find(user => user.email === email && user.password === password);
        setUser(user);
    };

    const logoutHandler = async () => {
        setUser(null);
    };

    const userContextValue = {
        isAuthenticated: !!user?.isAdmin,
        user,
        loginHandler,
        logoutHandler,
    };

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;