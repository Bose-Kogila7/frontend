// src/Departments.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../AuthComponent/axiosConfig'; // Import the axios instance
import './Departments.css';

const Departments = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axiosInstance.get('/api/users/departments');
                setDepartments(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };
        fetchDepartments();
    }, []);

    return (
        <div className="departments-container">
            <h2>Departments</h2>
            <table className="departments-table">
                <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(department => (
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.name}</td>
                            <td>{department.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Departments;