import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('http://localhost:8089/api/auth/signup', { username, password, role, name, email, phone });
            alert('Your account created successfully, Please log-in!!');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            setErrorMessage(error.response?.data || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <label>
                    Username:
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Role:
                    <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
                </label>
                <label>
                    Name:
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Phone:
                    <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="^(\+\d{1,3}[- ]?)?\d{10}$" />
                </label>
                <button type="submit">Signup</button>
            </form>
            {errorMessage && (
                <div className="error-message">
                    <p>{errorMessage}</p>
                    <button onClick={() => setErrorMessage('')}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Signup;