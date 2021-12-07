import React from 'react';
import { changePassword } from './api.js';
import { Page } from './App.js';

const ChangePassword = ({ setCurrentPage, currentUser, setCurrentUser }) => {

    const doChangePassword = () => {
        var newpass = document.getElementById("passwordEntry").value
        var result = changePassword(currentUser.username, currentUser.password, newpass)
        if (result.status === "success") {
            currentUser.password = newpass
            setCurrentUser(currentUser)
        }
        console.log("Changed password to " + newpass + ", going back")
        setCurrentPage(Page.ProfessorDashboard)
    }

    const doGoBack = () => {
        console.log("Back from change password")
        setCurrentPage(Page.ProfessorDashboard)
    }

    return (
        <div className="loginPage">
            <h3>Change Password</h3>

            <div style={{
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
            }}>
                <input type="text" id="passwordEntry" placeholder="password" /><br />
                <button style={{ margin: "1em" }} type="button" className="redbutton" onClick={doChangePassword}>Change Password</button><br />
            </div>
            <button style={{ margin: "1em" }} type="button" onClick={doGoBack}>Go Back</button><br />
        </div>
    );
}

export default ChangePassword;