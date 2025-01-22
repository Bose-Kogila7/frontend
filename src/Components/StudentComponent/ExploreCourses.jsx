import React, { useState, useEffect } from 'react';
import axiosInstance from '../AuthComponent/axiosConfig';
import './CourseStyles.css';

const ExploreCourses = ({ studentId }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get('api/users/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setShowConfirmPopup(true);
    };

    const handleConfirmEnroll = async () => {
        if (!studentId || !selectedCourse || !selectedCourse.id) {
            console.error('Student ID or Course ID is null');
            return;
        }

        const enrollmentData = {
            student_id: studentId,
            course_id: selectedCourse.id,
        };

        try {
            await axiosInstance.post('api/student/enroll', enrollmentData);
            setShowConfirmPopup(false);
            setShowSuccessPopup(true);
        } catch (error) {
            console.error('Error enrolling in course:', error);
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.');
            }
            setShowConfirmPopup(false);
        }
    };

    const handleClosePopup = () => {
        setShowConfirmPopup(false);
        setShowSuccessPopup(false);
        setErrorMessage('');
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + courses.length) % courses.length);
    };

    return (
        <div className="explore-courses-container">
            <h2>Explore Courses</h2>
            <div className="courses-carousel">
                <button className="carousel-button prev" onClick={handlePrev}>‹</button>
                <div className="course-box">
                    {courses.length > 0 && (
                        <>
                            <img src="CollegeCourse.jpg" alt="Course" />
                            <h3>{courses[currentIndex].title}</h3>
                            <p><strong>Course ID:</strong> {courses[currentIndex].id}</p>
                            <p><strong>Description:</strong> {courses[currentIndex].description}</p>
                            <p><strong>Department ID:</strong> {courses[currentIndex].departmentId}</p>
                            <p><strong>Faculty Name:</strong> {courses[currentIndex].facultyName}</p>
                            <button onClick={() => handleEnrollClick(courses[currentIndex])}>Enroll</button>
                        </>
                    )}
                </div>
                <button className="carousel-button next" onClick={handleNext}>›</button>
            </div>

            {showConfirmPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Are you sure you want to enroll in this course?</h3>
                        <p>{selectedCourse.title}</p>
                        <button onClick={handleConfirmEnroll}>Yes</button>
                        <button onClick={handleClosePopup}>No</button>
                    </div>
                </div>
            )}

            {showSuccessPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Congratulations!</h3>
                        <p>You are enrolled in the course: {selectedCourse.title}</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Error</h3>
                        <p>{errorMessage}</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExploreCourses;