import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import './AddStudent.css';

const AddStudent = () => {
    const [student, setStudent] = useState({
        photo: '',
        departmentId: '',
        year: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'student',
        userName: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirm = window.confirm("Are you sure you want to add this student?");
        if (confirm) {
            try {
                const response = await axiosInstance.post('/api/admin/add-Student', student);
                console.log('Response:', response);
                window.alert("Student added successfully!");
                navigate('/admin');
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage(error.response?.data || 'An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="add-student-container">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit} className="add-student-form">
                <label>
                    Photo:
                    <input type="text" name="photo" value={student.photo} onChange={handleChange} required />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={student.name} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={student.email} onChange={handleChange} required />
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" value={student.phone} onChange={handleChange} required />
                </label>
                <label>
                    Department ID:
                    <input type="text" name="departmentId" value={student.departmentId} onChange={handleChange} required />
                </label>
                <label>
                    Year:
                    <input type="text" name="year" value={student.year} onChange={handleChange} required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={student.password} onChange={handleChange} required />
                </label>
                <label>
                    Username:
                    <input type="text" name="userName" value={student.userName} onChange={handleChange} required />
                </label>
                <button type="submit">Submit</button>
            </form>
            {errorMessage && (
                <div className="error-message">
                    <p>{errorMessage}</p>
                    <button onClick={() => setErrorMessage('')}>Close</button>
                </div>
            )}
        </div>
    );
};

export default AddStudent;