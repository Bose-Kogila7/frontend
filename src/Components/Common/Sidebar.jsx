import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import axiosInstance from '../AuthComponent/axiosConfig';

const Sidebar = ({ user, sidebarOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        if (user && user.id) {
            let imageUrl;
            if (user.role === 'student') {
                imageUrl = `/api/student/image/${user.id}`;
            } else if (user.role === 'faculty') {
                imageUrl = `/api/faculty/image/${user.id}`;
            } else {
                setImageSrc('HomeLogo2.jpg'); // Set default image for other roles
                return;
            }

            axiosInstance.get(imageUrl, { responseType: 'arraybuffer' })
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    );
                    setImageSrc(`data:image/jpeg;base64,${base64}`);
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                    alert('Failed to fetch image. Please try again later.');
                });
        }
    }, [user]);

    const handleUpdate = () => {
        if (user.role === 'student') {
            navigate(`/update-profile/${user.id}`);
        } else if (user.role === 'faculty') {
            navigate(`/faculty/update/${user.id}`);
        } else {
            console.error('Unknown user role');
        }
    };

    if (!user) {
        return null; // Return null if user is not defined
    }

    return (
        <>
            {/* Sidebar Toggle Button */}
            <button className="sidebar-toggle" style={{ left: "0", position: "absolute" }} onClick={toggleSidebar}>
                {sidebarOpen ? '✖' : '☰'}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <div className="profile-section">
                        <img
                            src={imageSrc || 'CollegeCourse.jpg'} // Use fetched image or fallback
                            alt="Profile"
                            className="profile-photo"
                            onError={(e) => {
                                e.target.src = 'CollegeCourse.jpg'; // Fallback if the image fails to load
                            }}
                        />
                        <h3 className="profile-name">{user.username}</h3>
                        <p className="profile-email">{user.email}</p>
                    </div>
                    <div className="sidebar-menu">
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <button className="update-profile-button" onClick={handleUpdate}>
                            Update Profile
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;