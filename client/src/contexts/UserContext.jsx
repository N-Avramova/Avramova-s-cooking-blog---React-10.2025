import { useState } from 'react';
import { createContext } from 'react';
import useRequest from '../hooks/useRequest';
import usePersistedAuthState from '../hooks/usePersistedAuthState';

const initialState = {
    email: '',
    password: '',
    _createdOn: 0,
    _id: '',
    accessToken: ''
};

const UserContext = createContext({
    isAuthenticated: false,
    user: initialState,
    registerHandler() { },
    loginHandler: () => { },
    logoutHandler: () => { },
});

export function UserProvider({
    children,
}) {
    const [user, setUser] = useState(null);
    const { requestData } = useRequest();
    const { setPersistedAuthState, clearPersistedAuthState } = usePersistedAuthState(initialState, "userAuthToken");

    const registerHandler = async (email, password) => {
        const isAdmin = false;
        const newUser = { email, password, isAdmin };

        // Register API call 
        const user = await requestData('users/register', 'POST', newUser);

        // Login user after register and save token
        setUser(user);
        setPersistedAuthState(user);
    };

    const loginHandler = async (email, password) => {
        const user = await requestData("users/login", "POST", { email, password })
        setUser(user);
        setPersistedAuthState(user);
    };

    const logoutHandler = async () => {
        setUser(null);
        clearPersistedAuthState();
    };

    const userContextValue = {
        isAuthenticated: !!user?.accessToken,
        isAdmin: user?.isAdmin,
        user,
        registerHandler,
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