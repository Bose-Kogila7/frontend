import React, { useState, useEffect } from 'react';
import axiosInstance from '../AuthComponent/axiosConfig';
import '../Common/TableStyles.css';

const ViewCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const id = localStorage.getItem('id'); // Get the ID from local storage
            if (id) {
                try {
                    const response = await axiosInstance.get(`/api/student/course/${id}`);
                    setCourses(response.data);
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            } else {
                console.error('ID is null');
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="table-container">
            <h2>View Courses</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Department ID</th>
                        <th>Faculty ID</th>
                        <th>Faculty Name</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.departmentId}</td>
                            <td>{course.facultyId}</td>
                            <td>{course.facultyName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewCourses;