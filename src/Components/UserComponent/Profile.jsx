// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../AuthComponent/axiosConfig';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/api/users/profile');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data. Please try again later.');
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
            <div className="profile-links">
                <Link to="/courses" className="profile-link">View Courses</Link>
                <Link to="/departments" className="profile-link">View Departments</Link>
            </div>
        </div>
    );
};

export default Profile;