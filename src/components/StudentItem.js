// StudentItem.js
import React from 'react';

const StudentItem = ({ student, onEdit, onDelete }) => {
    // Check if student is defined before accessing its properties
    if (!student) {
        return <p>No student data available</p>;
    }

    const handleEdit = async (formData) => {
        // Call the update API endpoint with formData and student.id
        // Example: await axios.put(`https://localhost:5001/api/students/${student.id}`, formData);
        if (onEdit) {
            await onEdit(formData);
        }
    };

    const handleDelete = async () => {
        // Call the delete API endpoint with student.id
        // Example: await axios.delete(`https://localhost:5001/api/students/${student.id}`);
        if (onDelete) {
            await onDelete(student.id);
        }
    };

    return (
        <div>
            <p>{student.firstName} {student.lastName} - {student.email}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default StudentItem;
