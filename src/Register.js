import React from 'react';
import { login, registerStaff } from './api.js';
import { Page } from './App.js';


const Register = ({ setCurrentPage, setCurrentUser }) => {

    const doCreateStaff = () => {

        var usernameAttempt = document.getElementById("username").value;
        var passwordAttempt = document.getElementById("password").value;
        var nameAttempt = document.getElementById("name").value;
        var emailAttempt = document.getElementById("email").value;
        console.log("Calling make new staff with " + usernameAttempt + " and " + passwordAttempt)
        var result = registerStaff(usernameAttempt, passwordAttempt, nameAttempt, emailAttempt);
        console.log("Create staff result: " + result.status)

        if (result.status === "LoginExists") {
            document.getElementById("flair").hidden = false
            document.getElementById("flair").innerHTML = "Username/Password in use!"
        } else if (result.status === "EmailExists") {
            document.getElementById("flair").hidden = false
            document.getElementById("flair").innerHTML = "Email in use!"
        } else if (result.status === "failure") {
            document.getElementById("flair").hidden = false
            document.getElementById("flair").innerHTML = "Failed to make new admin account."
        } else {
            setCurrentPage(Page.ProfessorDashboard)
            setCurrentUser(login(usernameAttempt, passwordAttempt))
            document.getElementById("flair").hidden = true
        }
    }

    const doGoBack = () => {
        setCurrentPage(Page.Login)
    }

    return (
        <div className="registerPage">
            <p id="flair" hidden={true}>Hey!!!</p>

            <h3>Register</h3>
            <input type="text" id="username" placeholder="username" /><br />
            <input type="text" id="password" placeholder="password" /><br />
            <input type="text" id="name" placeholder="full name" /><br />
            <input type="text" id="email" placeholder="email" /><br />
            <div style={{
                    display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
            }}>
                <button type="button" onClick={doCreateStaff}>Register</button><br />
                <button type="button" onClick={doGoBack}>Back</button><br />
            </div>
        </div>
    );

}

export default Register;