import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import './DeleteStudent.css';

const DeleteStudent = () => {
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axiosInstance.get('/api/admin/getAllStudent');
                if (Array.isArray(response.data)) {
                    setStudentList(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                    setStudentList([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axiosInstance.delete(`/api/admin/deleteStudent/${id}`);
                setStudentList(studentList.filter(student => student.id !== id));
            } catch (error) {
                console.error('Error deleting student:', error);
                setError('This particular student enrolled in a course. Please resolve dependencies in database before deleting.');
            }
        }
    };

    const handleBackToAdmin = () => {
        navigate('/admin');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="delete-student-container">
            <h2>Delete Student</h2>
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={handleBackToAdmin}>Back to Admin</button>
                </div>
            )}
            <table className="student-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map(student => (
                        <tr key={student.id}>
                            <td data-label="ID">{student.id}</td>
                            <td data-label="Name">{student.name}</td>
                            <td data-label="Email">{student.email}</td>
                            <td data-label="Actions">
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeleteStudent;