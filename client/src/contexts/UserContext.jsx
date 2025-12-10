import { createContext } from 'react';
import useRequest from '../hooks/useRequest';
import usePersistedAuthState from '../hooks/usePersistedAuthState';

const initialState = {
    email: '',
    password: '',
    _createdOn: 0,
    _id: '',
    accessToken: '',
    isAdmin: false
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
    
    const { requestData } = useRequest();
    const { state : user, setPersistedAuthState, clearPersistedAuthState } = usePersistedAuthState(initialState, "userAuthToken");
    
    const registerHandler = async (email, password) => {
        const isAdmin = false;
        const newUser = { email, password, isAdmin };

        const user = await requestData('users/register', 'POST', newUser);
        setPersistedAuthState(user);
    };

    const loginHandler = async (email, password) => {
        const user = await requestData("users/login", "POST", { email, password });
        setPersistedAuthState(user);
    };

    const logoutHandler = async () => {
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