// src/Components/UserComponent/Users.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../AuthComponent/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8089/api/Allusers');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users. Please try again later.');
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="users-container">
            <h2>Users</h2>
            {error && <p className="error-message">{error}</p>}
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button" onClick={() => navigate('/admin')}>Back to Admin</button>
        </div>
    );
};

export default Users;