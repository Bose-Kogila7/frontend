import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import './DeleteFaculty.css';

const DeleteFaculty = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axiosInstance.get('/api/admin/getAllFaculty');
                if (Array.isArray(response.data)) {
                    setFacultyList(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                    setFacultyList([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching faculty data:', error);
                setLoading(false);
            }
        };

        fetchFaculty();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this faculty?')) {
            try {
                const dto = { id };
                await axiosInstance.delete(`/api/admin/deleteFaculty`, { data: dto });
                setFacultyList(facultyList.filter(faculty => faculty.id !== id));
            } catch (error) {
                console.error('Error deleting faculty:', error);
                setError('This faculty is mapped to a course. Please resolve dependencies before deleting.');
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
        <div className="delete-faculty-container">
            <h2>Delete Faculty</h2>
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={handleBackToAdmin}>Back to Admin</button>
                </div>
            )}
            <table className="faculty-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {facultyList.map(faculty => (
                        <tr key={faculty.id}>
                            <td data-label="ID">{faculty.id}</td>
                            <td data-label="Name">{faculty.name}</td>
                            <td data-label="Email">{faculty.email}</td>
                            <td data-label="Actions">
                                <button onClick={() => handleDelete(faculty.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeleteFaculty;