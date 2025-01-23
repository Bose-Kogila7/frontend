// src/Components/UserComponent/FacultyList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import './FacultyList.css';

const FacultyList = () => {
    const [faculty, setFaculty] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axiosInstance.get('api/admin/getAllFaculty');
                setFaculty(response.data);
            } catch (error) {
                console.error('Error fetching faculty:', error);
                setError('Failed to fetch faculty. Please try again later.');
            }
        };

        fetchFaculty();
    }, []);

    return (
        <div className="faculty-container">
            <h2>Faculty</h2>
            {error && <p className="error-message">{error}</p>}
            <table className="faculty-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department ID</th>
                        <th>Department Name</th>
                        <th>Office Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {faculty.map(facultyMember => (
                        <tr key={facultyMember.id}>
                            <td>{facultyMember.id}</td>
                            <td>{facultyMember.userId}</td>
                            <td>{facultyMember.name}</td>
                            <td>{facultyMember.email}</td>
                            <td>{facultyMember.phone}</td>
                            <td>{facultyMember.departmentId}</td>
                            <td>{facultyMember.departmentName}</td>
                            <td>{facultyMember.officeHours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button" onClick={() => navigate('/admin')}>Back to Admin</button>
        </div>
    );
};

export default FacultyList;