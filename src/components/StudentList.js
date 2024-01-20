// StudentList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentList.css'; // Import your custom CSS file for StudentList

const StudentList = ({ onAddStudent }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://localhost:44303/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleUpdate = (id, firstName, lastName) => {
    // Set the selected student and their current details
    setSelectedStudent({ id, firstName, lastName });
    // Reset the updated first and last names
    setUpdatedFirstName(firstName);
    setUpdatedLastName(lastName);

    // Here, you can open a modal for updating (pseudo-code)
    // setUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      // Make the API request to update the student
      await axios.put(`https://localhost:44303/api/students/${selectedStudent.id}`, {
        firstName: updatedFirstName,
        lastName: updatedLastName,
      });
      // Clear the selected student and trigger a refresh
      setSelectedStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:44303/api/students/${id}`);
      // Trigger a refresh after deleting a student
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{`${student.firstName} ${student.lastName}`}</td>
              <td>
                <button className="action-button update-button" onClick={() => handleUpdate(student.id, student.firstName, student.lastName)}>
                  Update
                </button>
                <button className="action-button delete-button" onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

      {selectedStudent && (
        <div className="update-section">
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
      )}



    </div>
  );
};

export default StudentList;
