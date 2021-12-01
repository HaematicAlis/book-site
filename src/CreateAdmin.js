import React from 'react';
import { Page } from './App.js'; 
import { createAdmin } from './api.js';


const CreateAdmin = ({setCurrentPage, currentUser}) => {

    const doCreateAdmin = () => {
        var usernameAttempt = document.getElementById("username").value;
        var passwordAttempt = document.getElementById("password").value;
        console.log("Calling make new admin with " + usernameAttempt + " and " + passwordAttempt)
        var result = createAdmin(usernameAttempt, passwordAttempt);
        console.log("Create admin result: " + result.status)
    }

    const doGoBack = () => {
        setCurrentPage(Page.AdminDashboard)
    }

    return (
        <div className="loginPage">
            <h3>Create New Admin</h3>
            <input type="text" id="username" placeholder="username"/><br />
            <input type="text" id="password" placeholder="password"/><br />
            <div style={{
                display: "flex", 
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <button style={{margin: "1em"}} type="button" onClick={doCreateAdmin}>Create Admin</button><br />
                <button style={{margin: "1em"}} type="button" onClick={doGoBack}>Back</button><br />
            </div>
        </div>
    );
}

export default CreateAdmin;