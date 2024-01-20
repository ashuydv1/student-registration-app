import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

const StudentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post('https://localhost:44303/api/students', formData);
      onAdd();
      // Clear the form after successful addition
      setFormData({ firstName: '', lastName: '', email: '' });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="add-student-form">
      <h2>Add Student</h2>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleAdd}>Add Student</button>
    </div>
  );
};

export default StudentForm;
