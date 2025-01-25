import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import Sidebar from '../Common/Sidebar';
import '../Common/Sidebar.css';
import './FacultyComponent.css';

const Faculty = () => {
    const [faculty, setFaculty] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacultyData = async () => {
            try {
                const response = await axiosInstance.get('/api/faculty/profile');
                setFaculty(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching faculty data:', error);
                setErrorMessage('You are not a registered faculty. Contact your administrator.');
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

    const viewStudentsByCourse = async () => {
        try {
            await axiosInstance.get(`/api/faculty/student-by-course/${faculty.id}`);
            navigate(`/students-by-course/${faculty.id}`);
        } catch (error) {
            console.error('Error fetching students by course:', error);
            setErrorMessage('You are not a registered faculty. Contact your administrator.');
        }
    };

    const handleClosePopup = () => {
        setErrorMessage('');
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
                    <div className="make-center">
                        <div className="main-content">
                            <h2>Welcome, {faculty.name}</h2>
                            <div className="chancellor-speech">
                                <div className="speech-image">
                                    <img src="Chancellor.jpg" alt="Chancellor" />
                                </div>
                                <div className="speech-text">
                                    <h3>Chancellor's Speech</h3>
                                    <p>Mr.{faculty.name}, I am deeply grateful for your unwavering dedication and commitment to our institution. Your tireless efforts in nurturing and guiding our students are the cornerstone of our success. Together, let us continue to inspire and empower the next generation of leaders.</p>
                                </div>
                            </div>
                            <div className="faculty-actions">
                                <button onClick={viewStudentsByCourse}>View Students by Course</button>
                                <button onClick={() => navigate('/student/search')}>Search Students</button>
                                <button onClick={handleUpdate}>Update Profile</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            
            {errorMessage && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Error</h3>
                        <p>{errorMessage}</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Faculty;