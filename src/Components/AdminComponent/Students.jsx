// src/Components/UserComponent/Students.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import './Students.css';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axiosInstance.get('api/admin/getAllStudent');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                setError('Failed to fetch students. Please try again later.');
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="students-container">
            <h2>Students</h2>
            {error && <p className="error-message">{error}</p>}
            <table className="students-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Department ID</th>
                        <th>Year</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.userId}</td>
                            <td>{student.departmentId}</td>
                            <td>{student.year}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.userName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button" onClick={() => navigate('/admin')}>Back to Admin</button>
        </div>
    );
};

export default Students;