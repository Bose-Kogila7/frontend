import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import Sidebar from '../Common/Sidebar';
import ExploreCourses from './ExploreCourses';
import './StudentComponent.css';

const Student = () => {
    const [student, setStudent] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axiosInstance.get('/api/student/profile');
                console.log('Student data:', response.data);
                setStudent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleUpdate = () => {
        navigate(`/student/update/${student.id}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!student) {
        return <p>No student data available.</p>;
    }

    return (
        <div className="student-container">
            <header className="student-header">
                <h1>Student Dashboard</h1>
            </header>
            <div className="content">
                <Sidebar
                    user={student}
                    handleUpdate={handleUpdate}
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                <main className={`student-main ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="make-center">
                    <div className="main-content">
                        <h2>Welcome, {student.name}</h2>
                        <div className="chancellor-speech">
                            <div className="speech-image">
                                <img src="Chancellor.jpg" alt="Chancellor" />
                            </div>
                            <div className="speech-text">
                                <h3>Chancellor's Speech</h3>
                                <p>Welcome to our esteemed institution. Our mission is to provide quality education and foster a nurturing environment for our students. We are committed to excellence and innovation in all our endeavors.</p>
                            </div>
                        </div>
                        <div className="student-actions">
                            <button onClick={() => navigate('/student/search')}>Search Students</button>
                            <button onClick={() => navigate('/student/courses')}>View Courses</button>
                            <button onClick={() => navigate('/student/faculty')}>View Faculty</button>
                        </div>
                        
                        <ExploreCourses studentId={student.id} />
                    </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Student;