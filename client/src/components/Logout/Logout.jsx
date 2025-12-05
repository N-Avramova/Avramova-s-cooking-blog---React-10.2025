import { useContext } from 'react';
import UserContext from '../../contexts/UserContext.jsx';   
import { useNavigate } from 'react-router';

export default function Logout() {
    
    const { logoutHandler } = useContext(UserContext);
    const navigate = useNavigate();

   
    logoutHandler()
        .then(() => navigate('/'))
        .catch((err) => {
            alert('Problem logging out: ' + err.message);
            navigate('/');
        })

    return null;
}