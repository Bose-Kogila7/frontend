// src/Courses.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../AuthComponent/axiosConfig'; // Import the axios instance
import './Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get('/api/users/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Courses</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Department</th>
                        <th>Faculty</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>{course.department?.name}</td>
                            <td>{course.faculty?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Courses;