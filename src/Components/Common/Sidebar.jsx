import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ user, sidebarOpen, toggleSidebar }) => {
    const navigate = useNavigate();

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
            <button className="sidebar-toggle " style={{left:"0",position:"absolute"}} onClick={toggleSidebar}>
                {sidebarOpen ? '✖' : '☰'}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <div className="profile-section">
                        <img
                            src={user.photo || 'alumni2.jpg'} // Fallback if photo is missing
                            alt="Profile"
                            className="profile-photo"
                            onError={(e) => {
                                e.target.src = 'alumni1.jpg'; // Fallback if the image fails to load
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