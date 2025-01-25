import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import './UpdateProfile.css';

const UpdateProfile = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [student, setStudent] = useState(location.state?.user || null);
    const [loading, setLoading] = useState(!location.state?.user);
    const [updatedData, setUpdatedData] = useState(location.state?.user || {});

    useEffect(() => {
        if (!location.state?.user) {
            const fetchStudentData = async () => {
                try {
                    const response = await axiosInstance.get(`/api/student/profile`);
                    setStudent(response.data);
                    setUpdatedData(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching student data:', error);
                    setLoading(false);
                }
            };

            fetchStudentData();
        }
    }, [location.state?.user, studentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Extract Base64 string
                setUpdatedData({ ...updatedData, photo: base64String });
            };
            reader.readAsDataURL(file); // Convert file to Base64
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                id: updatedData.id,
                userId: updatedData.userId,
                photo: updatedData.photo, 
                departmentId: updatedData.departmentId,
                year: updatedData.year,
                name: updatedData.name,
                email: updatedData.email,
                phone: updatedData.phone,
                userName: updatedData.userName,
                role: updatedData.role,
                password: updatedData.password || student.password,
            };
            await axiosInstance.put(`/api/student/update/${studentId}`, payload);
            alert('Profile updated successfully');
            navigate('/student'); // Redirect to the student component page
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!student) {
        return <p>No student data available.</p>;
    }

    return (
        <div className="update-profile-container">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="photo">Photo:</label></td>
                            <td>
                                {updatedData.photo && (
                                    <img src={updatedData.photo} alt="Profile" style={{ width: '100px', height: '100px' }} />
                                )}
                                <input
                                    type="file"
                                    id="upload-photo"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('upload-photo').click()}
                                    className="upload-photo-button"
                                >
                                    Upload Photo
                                </button>
                            </td>
                        </tr>
                        {/* Rest of the form fields */}
                        <tr>
                            <td><label htmlFor="departmentId">Department ID:</label></td>
                            <td><input type="text" id="departmentId" name="departmentId" value={updatedData.departmentId} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="year">Year:</label></td>
                            <td><input type="text" id="year" name="year" value={updatedData.year} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="name">Name:</label></td>
                            <td><input type="text" id="name" name="name" value={updatedData.name} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td><input type="email" id="email" name="email" value={updatedData.email} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="phone">Phone:</label></td>
                            <td><input type="text" id="phone" name="phone" value={updatedData.phone} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="role">Role:</label></td>
                            <td><input type="text" id="role" name="role" value={updatedData.role} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password:</label></td>
                            <td><input type="password" id="password" name="password" value={updatedData.password} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userName">Username:</label></td>
                            <td><input type="text" id="userName" name="userName" value={updatedData.userName} onChange={handleChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateProfile;