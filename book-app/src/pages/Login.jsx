import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import AxiosConfig from '../services/axiosConfig';
import './login.scss';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser(payload);
                navigate('/books');
            } catch (err) {
                console.error('Nevalidan token:', err);
                localStorage.removeItem('token');
            }
        }
    }, [setUser, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await AxiosConfig.post('/Auth/login', {
                username,
                password
            });

            const token = response.data;
            localStorage.setItem('token', token);

            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(payload);

            navigate('/books');
        } catch (err) {
            setError('Neuspešna prijava. Proveri podatke.');
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleLogin} className="login-card">
                <h2 className="login-title">Prijava</h2>
                {error && <div className="login-error">{error}</div>}

                <div className="login-group">
                    <input
                        type="text"
                        placeholder="Korisničko ime"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="login-group">
                    <input
                        type="password"
                        placeholder="Lozinka"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="login-btn">Prijavi se</button>
            </form>
        </div>
    );
};

export default Login;