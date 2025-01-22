import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#programs">Programs</a></li>
                        <li><a href="#admissions">Admissions</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p><strong>Address:</strong> KBSRIT, Near Central Park, Downtown, Coimbatore, Tamil Nadu, 123456, India</p>
                    <p><strong>Phone:</strong> +91 12345 67890</p>
                    <p><strong>Email:</strong> info@kbsrit.edu.in</p>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <ul className="social-links">
                        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /> Facebook</a></li>
                        <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a></li>
                        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></li>
                        <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 KBSRIT. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;