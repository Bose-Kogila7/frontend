import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <header className="home-header">
                <h1>Welcome to Our College</h1>
                <p>Discover our programs, campus life, and more.</p>
            </header>
            <section className="home-content">
                <div className="home-gallery">
                    <img src="college-photo1.jpg" alt="College" />
                    <img src="college-photo2.jpg" alt="Campus" />
                    <img src="college-photo3.jpg" alt="Students" />
                </div>
                <div className="home-info">
                    <h2>About Our College</h2>
                    <p>Our college offers a variety of programs and activities to help students achieve their goals.</p>
                </div>
            </section>
            <section className="home-links">
                <h2>Access Your Dashboard</h2>
                <div className="links-container">
                    <Link to="/student" className="role-link student-link">Student Dashboard</Link>
                    <Link to="/faculty" className="role-link faculty-link">Faculty Dashboard</Link>
                    <Link to="/admin" className="role-link admin-link">Admin Dashboard</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;