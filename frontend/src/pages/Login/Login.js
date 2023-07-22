import React, { useContext, useState } from 'react';
import axios from '../../api/axios';
import Auth from '../../contexts/Auth';
import { Navigate } from 'react-router-dom';
import './Login.scss';
import backgroundLogin from '../../assets/images/background_login.jpg';

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated } = useContext(Auth);

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        axios.post('/login', {
            email: email,
            password: password
        }).then((response) => {
            if (response.data.auth) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        isAuthenticated ? (
            <Navigate to="/" />
        ) : (
            <div className="login" style={{backgroundImage: `url(${backgroundLogin}`}}>
                <form onSubmit={handleSubmit}>
                    <h2>Connexion</h2>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder='Enter password'
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        )
    );
}

export default Login;