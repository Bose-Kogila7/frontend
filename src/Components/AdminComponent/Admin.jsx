import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import Sidebar from '../Common/Sidebar';
import Footer from '../HomeComponent/Footer';
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!admin) {
        return <p>No admin data available.</p>;
    }

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
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
                            <button onClick={handleViewFaculty}>View All Faculty</button> {/* Add View All Faculty button */}
                            <button onClick={() => console.log('Add Student')}>Add Student</button>
                            <button onClick={() => console.log('Add Faculty')}>Add Faculty</button>
                            <button onClick={handleViewUsers}>View Users</button>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Admin;