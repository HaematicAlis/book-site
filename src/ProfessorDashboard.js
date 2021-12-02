import React from 'react';
import { Page } from './App.js'; 

const ProfessorDashboard = ({setCurrentPage, currentUser}) => {
    return (
        <div className="loginPage">
            <h3>Professor Dashboard</h3>
            <p id="welcome">Welcome, Professor {currentUser.name}</p>
            <p id="empId">empId: {currentUser.empId}</p>
        </div>
    );
}

export default ProfessorDashboard;