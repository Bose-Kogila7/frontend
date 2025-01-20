import React, { useState, useEffect } from 'react';
import axiosInstance from '../AuthComponent/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './Enrollments.css';

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await axiosInstance.get('/api/enrollments');
                setEnrollments(response.data);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
            }
        };

        fetchEnrollments();
    }, []);

    return (
        <div className="enrollments-container">
            <h2>Enrollments</h2>
            <table className="enrollments-table">
                <thead>
                    <tr>
                        <th>Enrollment ID</th>
                        <th>Student ID</th>
                        <th>Course ID</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map((enrollment) => (
                        <tr key={enrollment.id}>
                            <td>{enrollment.id}</td>
                            <td>{enrollment.student_id}</td>
                            <td>{enrollment.course_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button" onClick={() => navigate('/admin')}>Back to Admin</button>
        </div>
    );
};

export default Enrollments;