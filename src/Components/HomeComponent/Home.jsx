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
        autoplaySpeed: 2000,
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
        { img: 'alumni7.jpg', name:'Kiran Bedi', designation:'Former Lieutenant Governor of Puducherry', message: ' "KBSRIT instilled values of integrity and service in me. The holistic education was key to my personal and professional growth."' },
        { img: 'alumni2.jpg', name : 'SS Rajamouli', designation:'Most Successful director of Indian cinema', message: '"The creative freedom at KBSRIT nurtured my passion for filmmaking. It was instrumental in honing my storytelling skills."' },
        { img: 'alumni3.jpg', name:'G Mahesh Babu', designation:'A Big Star of Cinema Industry', message: '"KBSRIT gave me the confidence and foundation to excel in the film industry. The supportive environment was key to my success."' },
        { img: 'alumni4.jpg', name:'AR Rahman', designation:'Biggest Music Director of Indian cinema', message: '"KBSRIT helped me discover and refine my musical talents. The colleges support was crucial in my journey to becoming a music director."' },
        { img: 'alumni5.jpg', name:'MS Dhoni', designation:'Former Indian cricket team captain', message: '"The discipline and leadership skills I gained at KBSRIT have been invaluable. The holistic education prepared me for all challenges."' },
        { img: 'alumni1.jpg', name:'Ram Gopal Varma', designation:'Philosopher and director of art', message: '"KBSRITs emphasis on critical thinking helped shape my artistic vision. The diverse experiences were pivotal in my development."' },
        { img: 'alumni6.jpg', name:'Nirmala Sitharaman', designation:'Minister of Corporate Affairs of India',  message: '"The comprehensive education at KBSRIT equipped me with essential skills. The emphasis on excellence and ethics has been a cornerstone of my success."' }
    ];

    return (
        <div className="home">
            <header className="home-header">
                <img src="HomeLogo2.jpg" alt="College Logo" className="home-header-image" />
                <h2>WELCOME  TO  KBSRIT </h2>
                <h1>EDUCATION & EVOLUTION</h1>
            </header>
            <section id="about" className="home-description">
                <div className="scrollspy-example" tabIndex="0">
                    <h4 id="scrollspyHeading1">ABOUT KBSRIT</h4>
                    <p>Kogila Bose Solomon Raj Institution of Technology inagurated on 1945. The college is NAAC A++ credited and acquired university status on 2002. We are consistently developing the next generation of india all through these years. Our Alumnis are the faces of India in their own fields.</p>
                    <h4 id="scrollspyHeading2">Mission of college</h4>
                    <p>At KBSRIT, we believe in nurturing minds and fostering growth. Our commitment to 'Education and Evolution' ensures that every student not only gains knowledge but also evolves into a well-rounded individual ready to face the challenges of tomorrow. Join us in our journey towards excellence and innovation.</p>
                    <h4 id="scrollspyHeading3">College Moto & Values</h4>
                    <p>Our college motto, "Education and Evolution," reflects our dedication to shaping adaptable and knowledgeable individuals. We focus on providing a dynamic learning environment that encourages both academic excellence and personal growth. By embracing change and innovation, we prepare our students to thrive in an ever-evolving world.</p>
                    <h4 id="scrollspyHeading4">KBSRIT Achievements</h4>
                    <p>KBSRIT has consistently demonstrated excellence in academics, with students achieving top ranks in university exams. Our faculty and students have contributed to numerous research projects, resulting in publications in prestigious journals. We take pride in our innovative projects, which have won accolades at national and international competitions. Additionally, our commitment to community service has made a positive impact on society.</p>
                    <h4 id="scrollspyHeading5">Campus Environment</h4>
                    <p>KBSRIT boasts a vibrant campus environment with spacious buildings and state-of-the-art laboratories that foster innovation and learning. Our well-stocked libraries provide a wealth of resources for students and faculty alike. The campus also features excellent sports facilities and a modern auditorium. Beyond the curriculum, we offer a variety of extracurricular activities and clubs that encourage students to explore their interests and develop new skills.</p>
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
                            <p>{alumni.name}<br/>
                            {alumni.designation}<br/>
                            {alumni.message}</p>
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
                        <p><strong>Area:</strong> Vital Nagar</p>
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