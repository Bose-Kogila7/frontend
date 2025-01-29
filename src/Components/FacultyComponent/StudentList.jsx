import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import './StudentList.css';

const StudentList = () => {
    const { facultyId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const dto = { facultyId };
                const response = await axiosInstance.get(`/api/faculty/student-by-course`,{ data:dto });
                setStudents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setLoading(false);
            }
        };

        fetchStudents();
    }, [facultyId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (students.length === 0) {
        return <p>No students found for this course.</p>;
    }

    return (
        <div className="student-list-container">
            <h1>Students by Course</h1>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Course Title</th>
                        <th>Course Description</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.studentId}>
                            <td>{student.studentId}</td>
                            <td>{student.studentName}</td>
                            <td>{student.studentEmail}</td>
                            <td>{student.studentPhone}</td>
                            <td>{student.courseTitle}</td>
                            <td>{student.courseDescription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;