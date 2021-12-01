import React from 'react';
import { Page } from './App.js'; 

const AdminDashboard = ({setCurrentPage, currentUser}) => {

    const doGoToCreateAdmin = () => {
        setCurrentPage(Page.CreateAdmin);
    }

    return (
        <div className="loginPage">
            <h3>Admin Dashboard</h3>
            <p id="welcome">Welcome, {currentUser.username}</p>
            <p id="empId">empId: {currentUser.empId}</p>
            <button type="newAdminButton" onClick={doGoToCreateAdmin}>Create New Admin Account</button><br />
        </div>
    );
}

export default AdminDashboard;