import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import Sidebar from '../Common/Sidebar';
import './AdminComponent.css';

const Admin = () => {
    const [admin, setAdmin] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axiosInstance.get('/api/admin/profile');
                console.log('Admin data:', response.data);
                setAdmin(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleUpdate = async (updatedData) => {
        try {
            await axiosInstance.put(`/api/admin/update/${admin.id}`, updatedData);
            setAdmin(updatedData);
        } catch (error) {
            console.error('Error updating admin data:', error);
        }
    };

    const handleViewUsers = () => {
        navigate('/users');
    };

    const handleViewStudents = () => {
        navigate('/students');
    };

    const handleViewFaculty = () => {
        navigate('/facultylist'); // Navigate to the FacultyList component
    };

    const handleAddStudent = () => {
        navigate('/add-student');
    };

    const handleAddFaculty = () => {
        navigate('/add-faculty');
    };

    const handleViewEnrollments = () => {
        navigate('/enrollments'); // Navigate to the Enrollments component
    };

    const handleDeleteFaculty = () => {
        navigate('/delete-faculty');
    };

    const handleDeleteStudent = () => {
        navigate('/delete-student');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!admin) {
        return <p>No admin data available.</p>;
    }

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>ADMIN Dashboard</h1>
            </header>
            <div className="content">
                <Sidebar
                    user={admin}
                    handleUpdate={handleUpdate}
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                <main className={`admin-main ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="main-content">
                        <h2>Welcome, {admin.name}</h2>
                        <div className="admin-actions">
                            <button onClick={handleViewStudents}>View All Students</button>
                            <button onClick={handleViewFaculty}>View All Faculty</button>
                            <button onClick={handleAddStudent}>Add Student</button>
                            <button onClick={handleAddFaculty}>Add Faculty</button>
                            <button onClick={handleViewUsers}>View Users</button>
                            <button onClick={handleViewEnrollments}>View Enrollments</button>
                            <button onClick={handleDeleteFaculty}>Delete Faculty</button>
                            <button onClick={handleDeleteStudent}>Delete Student</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Admin;