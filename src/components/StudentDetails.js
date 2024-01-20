// StudentDetails.js
import React from 'react';

const StudentDetails = ({ student }) => {
    // Check if student is defined before accessing its properties
    if (!student) {
        return <p>No student data available</p>;
    }

    return (
        <div>
            <h2>Student Details</h2>
            <p>Name: {student.firstName} {student.lastName}</p>
            <p>Email: {student.email}</p>
        </div>
    );
};

export default StudentDetails;
