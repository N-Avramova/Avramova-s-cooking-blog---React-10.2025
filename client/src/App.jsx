import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import { Routes, Route } from 'react-router';
import Details from './components/Details/Details';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import AdminComments from './components/AdminComments/AdminComments';
import AuthGuard from './components/RouteGuard/RouteGuard';
import { useContext } from 'react';
import UserContext from './contexts/UserContext.jsx';
import Edit from './components/Edit/Edit.jsx';
import CreateRecipe from './components/CreateRecipe/CreateRecipe.jsx';
import Register from './components/Register/Register.jsx';

function App() {  
    const { user } = useContext(UserContext);

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
          <Route element={<AuthGuard user={user} />}>
            <Route path="/:recipeId/edit" element={<Edit />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/comments-admin" element={<AdminComments />} />
          </Route>          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

        <Footer />
      </>
    )
  }

  export default App
