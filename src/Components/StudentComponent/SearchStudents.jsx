import React, { useState } from 'react';
import axiosInstance from '../AuthComponent/axiosConfig';
import '../Common/TableStyles.css';

const SearchStudents = () => {
    const [searchKey, setSearchKey] = useState('');
    const [students, setStudents] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/api/student/search/${searchKey}`);
            setStudents(response.data);
        } catch (error) {
            console.error('Error searching students:', error);
        }
    };

    return (
        <div className="table-container">
            <h2>Search Students</h2>
            <input
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Enter search key"
            />
            <button onClick={handleSearch}>Search</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department ID</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.departmentId}</td>
                            <td>{student.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchStudents;