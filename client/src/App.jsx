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

function App() {

  const [userId, setUserId] = useState(null);
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

    setUserId(user?._id);
  };

  const logoutHandler = () => {
    setUserId(null);
  };

  return (
    <>
      <Header userId={userId} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sweet" element={<Home categoryName="sweet" />} />
        <Route path="/soup" element={<Home categoryName="soup" />} />
        <Route path="/salad" element={<Home categoryName="salad" />} />
        <Route path="/main-course" element={<Home categoryName="main-course" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:recipeId" element={<Details userId={userId} />} />
        <Route path="/login" element={<Login onLogin={loginHandler} />} />
        <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
