import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import Sidebar from '../Common/Sidebar';
import Footer from '../HomeComponent/Footer';
import './FacultyComponent.css';

const Faculty = () => {
    const [faculty, setFaculty] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacultyData = async () => {
            try {
                const response = await axiosInstance.get('/api/faculty/profile');
                setFaculty(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching faculty data:', error);
                setLoading(false);
            }
        };

        fetchFacultyData();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleUpdate = () => {
        navigate(`/faculty/update/${faculty.id}`);
    };

    const viewStudentsByCourse = () => {
        navigate(`/students-by-course/${faculty.id}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!faculty) {
        return <p>No faculty data available.</p>;
    }

    return (
        <div className="faculty-container">
            <header className="faculty-header">
                <h1>Faculty Dashboard</h1>
            </header>
            <div className="content">
                <Sidebar
                    user={faculty}
                    handleUpdate={handleUpdate}
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                <main className={`faculty-main ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="main-content">
                        <h2>Welcome, {faculty.name}</h2>
                        <div className="faculty-actions">
                            <button onClick={viewStudentsByCourse}>View Students by Course</button>
                            <button onClick={handleUpdate}>Update Profile</button>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Faculty;