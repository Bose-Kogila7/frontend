import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import './AddFaculty.css';

const AddFaculty = () => {
    const [faculty, setFaculty] = useState({
        photo: '',
        name: '',
        password: '',
        email: '',
        phone: '',
        departmentId: '',
        officeHours: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFaculty({ ...faculty, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirm = window.confirm("Are you sure you want to add this faculty?");
        if (confirm) {
            try {
                const response = await axiosInstance.post('/api/admin/add-Faculty', faculty);
                console.log('Response:', response);
                window.alert("Faculty added successfully!");
                navigate('/admin');
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage(error.response?.data || 'An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="add-faculty-container">
            <h2>Add Faculty</h2>
            <form onSubmit={handleSubmit} className="add-faculty-form">
                <label>
                    Photo:
                    <input type="text" name="photo" value={faculty.photo} onChange={handleChange} required />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={faculty.name} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={faculty.email} onChange={handleChange} required />
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" value={faculty.phone} onChange={handleChange} required />
                </label>
                <label>
                    Department ID:
                    <input type="text" name="departmentId" value={faculty.departmentId} onChange={handleChange} required />
                </label>
                <label>
                    Office Hours:
                    <input type="text" name="officeHours" value={faculty.officeHours} onChange={handleChange} required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={faculty.password} onChange={handleChange} required />
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

export default AddFaculty;