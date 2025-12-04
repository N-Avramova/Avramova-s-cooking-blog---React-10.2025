import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import { Routes, Route } from 'react-router';
import Details from './components/Details/Details';
import Login from './components/Login/Login';
import { fetchAllUsers } from './services/usersServices';
import Logout from './components/Logout/Logout';
import AdminComments from './components/AdminComments/AdminComments';
import AuthGuard from './components/RouteGuard/RouteGuard';

function App() {

  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchAllUsers();
      setAllUsers(users);
    }
    fetchUsers();
  }, []);


  const loginHandler = (email, password) => {
    console.log(`Logging in with Email: ${email}, Password: ${password}`);

    const user = allUsers.find(user => user.email === email && user.password === password);

    setUser(user);
  };

  const logoutHandler = () => {
    setUser(null);
  };

  return (
    <>
      <Header user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sweet" element={<Home categoryName="sweet" />} />
        <Route path="/soup" element={<Home categoryName="soup" />} />
        <Route path="/salad" element={<Home categoryName="salad" />} />
        <Route path="/main-course" element={<Home categoryName="main-course" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:recipeId" element={<Details user={user} />} />
        <Route element={<AuthGuard user={user}  />}>
          <Route path="/comments-admin" element={<AdminComments />} />
        </Route>
        <Route path="/login" element={<Login onLogin={loginHandler} />} />
        <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
