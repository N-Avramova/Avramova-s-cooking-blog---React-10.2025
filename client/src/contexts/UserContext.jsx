import { useState } from 'react';
import { createContext } from 'react';
import useRequest from '../hooks/useRequest';

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

    const registerHandler = async (email, password) => {
        const isAdmin = false;
        const newUser = { email, password, isAdmin };

        // Register API call 
        const user = await requestData('users/register', 'POST', newUser);

        // Login user after register and save token
        setUser(user);
    };

    const loginHandler = async (email, password) => {

        // work 
        const user = await requestData("users/login", "POST", { email, password })
        // email = "peter@abv.bg";
        // password ="123456";
        //  // Register API call 
        // const response = await fetch('http://localhost:3030/users/login', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     body: JSON.stringify({ email, password }),
        // });

        // const result = await response.json();


        // const allUsers = await fetchAllUsers();
        // console.log(`Logging in with Email: ${email}, Password: ${password}`);

        // const user = allUsers.find(user => user.email === email && user.password === password);
        setUser(user);

    };

    const logoutHandler = async () => {
        setUser(null);
    };

    const userContextValue = {
        isAuthenticated: !!user.accessToken,
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