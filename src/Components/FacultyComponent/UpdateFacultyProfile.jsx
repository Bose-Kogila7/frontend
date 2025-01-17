import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../AuthComponent/axiosConfig';
import './UpdateProfile.css';

const UpdateFacultyProfile = () => {
    const { facultyId } = useParams();
    const navigate = useNavigate();
    const [faculty, setFaculty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        const fetchFacultyData = async () => {
            try {
                const response = await axiosInstance.get(`/api/faculty/profile`);
                setFaculty(response.data);
                setUpdatedData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching faculty data:', error);
                setLoading(false);
            }
        };

        fetchFacultyData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmUpdate = window.confirm("Are you sure you want to update?");
        if (confirmUpdate) {
            try {
                const payload = {
                    id: updatedData.id,
                    userId: updatedData.userId,
                    photo: updatedData.photo,
                    name: updatedData.name,
                    email: updatedData.email,
                    phone: updatedData.phone,
                    departmentId: updatedData.departmentId,
                    departmentName: updatedData.departmentName,
                    officeHours: updatedData.officeHours,
                    password: updatedData.password || faculty.password // Ensure password is included
                };
                await axiosInstance.put(`/api/faculty/update/${facultyId}`, payload);
                alert('Profile updated successfully');
                navigate('/faculty'); // Redirect to the faculty component page
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!faculty) {
        return <p>No faculty data available.</p>;
    }

    return (
        <div className="update-profile-container">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="photo">Photo:</label></td>
                            <td><input type="text" id="photo" name="photo" value={updatedData.photo} onChange={handleChange} /></td>
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
                            <td><label htmlFor="departmentId">Department ID:</label></td>
                            <td><input type="text" id="departmentId" name="departmentId" value={updatedData.departmentId} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="departmentName">Department Name:</label></td>
                            <td><input type="text" id="departmentName" name="departmentName" value={updatedData.departmentName} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="officeHours">Office Hours:</label></td>
                            <td><input type="text" id="officeHours" name="officeHours" value={updatedData.officeHours} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password:</label></td>
                            <td><input type="password" id="password" name="password" value={updatedData.password} onChange={handleChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateFacultyProfile;