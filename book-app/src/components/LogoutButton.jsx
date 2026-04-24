import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

const LogoutButton = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return <button
        onClick={handleLogout}
        style={{
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }}
    >
        Odjavi se
    </button>;
};

export default LogoutButton;