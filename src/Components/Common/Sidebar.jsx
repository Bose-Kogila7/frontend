import React from 'react';
import './Sidebar.css';

const Sidebar = ({ user, handleUpdate, sidebarOpen, toggleSidebar }) => {
    if (!user) {
        return null; // Return null if user is not defined
    }

    return (
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {sidebarOpen ? '✖' : '☰'} {/* Toggle between open and close icons */}
            </button>
            <div className="sidebar-content">
                <img src={user.photo} alt="Profile" className="profile-photo" />
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <button onClick={() => handleUpdate({ ...user, phone: 'new-phone-number' })}>
                    Update Profile
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;