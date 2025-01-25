import React, { useState } from 'react';
import axiosInstance from './axiosConfig';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/api/auth/login', { email, password });
            const { token, role, id } = response.data; // Assuming the response contains token, role, and id
            console.log('Response data:', response.data);

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('id', id); // Store the ID in local storage

                // Debugging: Check the stored role and ID
                console.log('Stored role:', localStorage.getItem('role'));
                console.log('Stored ID:', localStorage.getItem('id'));


                // Navigate based on role
                if (role === 'student') {
                    navigate('/student');
                } else if (role === 'faculty') {
                    navigate('/faculty');
                } else if (role === 'ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/profile');
                }

                // Trigger storage event manually to update userRole state in App.js
                window.dispatchEvent(new Event('storage'));
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Login failed. Please check your credentials and try again.');
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
