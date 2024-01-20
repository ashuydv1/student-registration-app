// UpdateStudent.js

import React, { useState } from 'react';
import axios from 'axios';
import './UpdateStudent.css';

const UpdateStudent = ({ selectedStudent, onCancelUpdate, onRefresh }) => {
  const [updatedFirstName, setUpdatedFirstName] = useState(selectedStudent.firstName);
  const [updatedLastName, setUpdatedLastName] = useState(selectedStudent.lastName);

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`https://localhost:44303/api/students/${selectedStudent.id}`, {
        firstName: updatedFirstName,
        lastName: updatedLastName,
      });
      onCancelUpdate(); // Close the Update Student Form
      onRefresh(); // Refresh the Student List
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="update-student">
      <h2>Update Student</h2>
      <label>
        First Name:
        <input
          type="text"
          value={updatedFirstName}
          onChange={(e) => setUpdatedFirstName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={updatedLastName}
          onChange={(e) => setUpdatedLastName(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleUpdateSubmit}>Update</button>
    </div>
  );
};

export default UpdateStudent;
