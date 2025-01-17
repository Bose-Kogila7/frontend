import React, { useState, useEffect } from 'react';
import axiosInstance from '../AuthComponent/axiosConfig';
import './CourseStyles.css';

const ExploreCourses = ({ studentId }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
    console.log(courses);
    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setShowConfirmPopup(true);
    };

    const handleConfirmEnroll = async () => {
        console.log('Student ID:', studentId); // Debugging: Log studentId
        console.log('Selected Course:', selectedCourse); // Debugging: Log selectedCourse
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
        }
    };

    const handleClosePopup = () => {
        setShowConfirmPopup(false);
        setShowSuccessPopup(false);
    };

    return (
        <div className="explore-courses-container">
            <h2>Explore Courses</h2>
            <div className="courses-grid">
                {courses.map((course) => (
                    <div className="course-box" key={course.id}>
                        <img src="https://via.placeholder.com/100" alt="Course" />
                        <h3>{course.title}</h3>
                        <p><strong>Course ID:</strong> {course.id}</p>
                        <p><strong>Description:</strong> {course.description}</p>
                        <p><strong>Department ID:</strong> {course.departmentId}</p>
                        <p><strong>Faculty Name:</strong> {course.facultyName}</p>
                        <button onClick={() => handleEnrollClick(course)}>Enroll</button>
                    </div>
                ))}
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
        </div>
    );
};

export default ExploreCourses;