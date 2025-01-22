import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        onLogout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src="Logo2.jpg" alt="Logo" className="navbar-logo" />
                <Link to="/">KBSR INSTITUTE OF TECHNOLOGY</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <a href="#about">About</a>
                <a href="#programs">Programs</a>
                <a href="#admissions">Admissions</a>
                <a href="#contact">Contact</a>
                {token ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;