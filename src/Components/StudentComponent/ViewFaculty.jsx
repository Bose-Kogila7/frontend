import React, { useState, useEffect } from 'react';
import axiosInstance from '../AuthComponent/axiosConfig';
import '../Common/TableStyles.css'

const ViewFaculty = () => {
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        const fetchFaculty = async () => {
            const id = localStorage.getItem('id'); // Get the ID from local storage
            if (id) {
                try {
                    const response = await axiosInstance.get(`/api/student/faculty-advised/${id}`);
                    setFaculty(response.data);
                } catch (error) {
                    console.error('Error fetching faculty:', error);
                }
            } else {
                console.error('ID is null');
            }
        };

        fetchFaculty();
    }, []);

    return (
        <div className="table-container">
            <h2>View Faculty</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Office Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {faculty.map((facultyMember) => (
                        <tr key={facultyMember.id}>
                            <td>{facultyMember.id}</td>
                            <td>{facultyMember.name}</td>
                            <td>{facultyMember.email}</td>
                            <td>{facultyMember.phone}</td>
                            <td>{facultyMember.departmentName}</td>
                            <td>{facultyMember.officeHours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewFaculty;