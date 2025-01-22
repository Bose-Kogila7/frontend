import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
    const alumniSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const alumniData = [
        { img: 'alumni1.jpg', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
        { img: 'alumni2.jpg', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
        { img: 'alumni3.jpg', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
        { img: 'alumni4.jpg', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
        { img: 'alumni5.jpg', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
        { img: 'alumni6.jpg', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
        { img: 'alumni7.jpg', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' }
    ];

    return (
        <div className="home">
            <header className="home-header">
                <h1>Welcome to KBSRIT</h1>
                <p>Our college motto and description will go here.</p>
            </header>
            <section id="about" className="home-description">
                <div className="scrollspy-example" tabIndex="0">
                    <h4 id="scrollspyHeading1">First heading</h4>
                    <p>Our college offers a variety of programs and activities to help students achieve their goals. We are committed to providing a supportive and enriching environment for all our students.</p>
                    <h4 id="scrollspyHeading2">Second heading</h4>
                    <p>Our college offers a variety of programs and activities to help students achieve their goals. We are committed to providing a supportive and enriching environment for all our students.</p>
                    <h4 id="scrollspyHeading3">Third heading</h4>
                    <p>Our college offers a variety of programs and activities to help students achieve their goals. We are committed to providing a supportive and enriching environment for all our students.</p>
                    <h4 id="scrollspyHeading4">Fourth heading</h4>
                    <p>Our college offers a variety of programs and activities to help students achieve their goals. We are committed to providing a supportive and enriching environment for all our students.</p>
                    <h4 id="scrollspyHeading5">Fifth heading</h4>
                    <p>Our college offers a variety of programs and activities to help students achieve their goals. We are committed to providing a supportive and enriching environment for all our students.</p>
                </div>
                <div className="video-box">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/6ehrDzVq0SU?si=bq_P5BOoFT3pjfJP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </section>
            <section id="programs" className="home-life">
                <h2>KBSRIT Life</h2>
                <div className="life-gallery">
                    <div className="gallery-item">
                        <img src="College.jpg" alt="Campus Life 1" />
                        <p>College Building</p>
                    </div>
                    <div className="gallery-item">
                        <img src="Library.jpg" alt="Campus Life 2" />
                        <p>Library</p>
                    </div>
                    <div className="gallery-item">
                        <img src="Hostel.jpg" alt="Campus Life 3" />
                        <p>Hostel</p>
                    </div>
                    <div className="gallery-item">
                        <img src="Ground.jpg" alt="Campus Life 4" />
                        <p>Sports Ground</p>
                    </div>
                    <div className="gallery-item">
                        <img src="cafe.jpg" alt="Campus Life 5" />
                        <p>Cafeteria</p>
                    </div>
                    <div className="gallery-item">
                        <img src="Indoor.jpg" alt="Campus Life 6" />
                        <p>Indoor Sports</p>
                    </div>
                </div>
            </section>
            <section className="home-links">
                <h2>Access Your Dashboard</h2>
                <div className="links-container">
                    <Link to="/login" className="role-link student-link">Student Dashboard</Link>
                    <Link to="/login" className="role-link faculty-link">Faculty Dashboard</Link>
                    <Link to="/login" className="role-link admin-link">Admin Dashboard</Link>
                </div>
            </section>
            <section id="admissions" className="home-alumni">
                <h2>Our Alumni</h2>
                <Slider {...alumniSettings}>
                    {alumniData.map((alumni, index) => (
                        <div key={index} className="alumni-slide">
                            <img src={alumni.img} alt={`Alumni ${index + 1}`} />
                            <p>{alumni.message}</p>
                        </div>
                    ))}
                </Slider>
            </section>
            <section id="contact" className="home-address">
                <h2>Address</h2>
                <div className="address-content">
                    <div className="map-box">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.9630579153169!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9c1b1a1b1!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1611816751234!5m2!1sen!2sau"
                            width="400"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="College Location"
                        ></iframe>
                    </div>
                    <div className="address-box">
                        <p><strong>College Name:</strong> KBSRIT</p>
                        <p><strong>Landmark:</strong> Near Central Park</p>
                        <p><strong>Area:</strong> Downtown</p>
                        <p><strong>Pincode:</strong> 123456</p>
                        <p><strong>City:</strong> Coimbatore</p>
                        <p><strong>State:</strong> Tamil Nadu</p>
                        <p><strong>Country:</strong> India</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;