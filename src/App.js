import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/HomeComponent/Home';
import Login from './Components/AuthComponent/Login';
import Profile from './Components/UserComponent/Profile';
import Courses from './Components/CourseComponent/Courses';
import Departments from './Components/DepartmentComponent/Departments';
import Navbar from './Components/HomeComponent/Navbar';
import Footer from './Components/HomeComponent/Footer';
import Student from './Components/StudentComponent/StudentComponent';
import Faculty from './Components/FacultyComponent/Faculty';
import Admin from './Components/AdminComponent/Admin';
import SearchStudents from './Components/StudentComponent/SearchStudents';
import ViewCourses from './Components/StudentComponent/ViewCourses';
import ViewFaculty from './Components/StudentComponent/ViewFaculty';
import UpdateProfile from './Components/StudentComponent/UpdateProfile';
import StudentList from './Components/FacultyComponent/StudentList';
import UpdateFacultyProfile from './Components/FacultyComponent/UpdateFacultyProfile';
import Users from './Components/UserComponent/Users';
import Students from './Components/AdminComponent/Students';
import FacultyList from './Components/AdminComponent/FacultyList';

const App = () => {
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));

    useEffect(() => {
        const handleStorageChange = () => {
            const role = localStorage.getItem('role');
            setUserRole(role);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUserRole(null);
    };

    // Debugging: Check the current role
    console.log('Current role:', userRole);

    return (
        <Router>
            <div className="app">
                <Navbar onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/student" element={userRole === 'student' ? <Student /> : <Navigate to="/" />} />
                    <Route path="/faculty" element={userRole === 'faculty' ? <Faculty /> : <Navigate to="/" />} />
                    <Route path="/admin" element={userRole === 'ADMIN' ? <Admin /> : <Navigate to="/" />} />
                    <Route path="/student/search" element={<SearchStudents />} />
                    <Route path="/student/courses" element={<ViewCourses />} />
                    <Route path="/student/faculty" element={<ViewFaculty />} />
                    <Route path="/student/update/:studentId" element={<UpdateProfile />} />
                    <Route path="/students-by-course/:facultyId" element={<StudentList />} />
                    <Route path="/faculty/update/:facultyId" element={<UpdateFacultyProfile />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/facultylist" element={<FacultyList />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;