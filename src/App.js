// App.js

import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Navbar from './components/Navbar';
import UpdateStudent from './components/UpdateStudent';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleAddStudent = async () => {
    setRefreshKey((prevKey) => prevKey + 1);
    // Close the Update Student Form if it's open
    setSelectedStudent(null);
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
  };

  const handleCancelUpdate = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {selectedStudent ? (
          <div className="update-student">
            <UpdateStudent
              selectedStudent={selectedStudent}
              onCancelUpdate={handleCancelUpdate}
              onRefresh={handleAddStudent}
            />
          </div>
        ) : (
          <div className="student-list">
            <StudentList key={refreshKey} onUpdate={handleUpdate} />
          </div>
        )}

        <div className="add-student">
          <StudentForm onAdd={handleAddStudent} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
