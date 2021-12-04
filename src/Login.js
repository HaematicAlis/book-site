import React from 'react';
import { login } from './api.js';
import { Page } from './App.js';


const Login = ({ setCurrentPage, setCurrentUser }) => {

    const doLogin = () => {
        var usernameAttempt = document.getElementById("username").value;
        var passwordAttempt = document.getElementById("password").value;

        if (usernameAttempt === "" && passwordAttempt === "") {
            //TODO: Remove this entire if statement
            console.log("HEY!!! I'M OVERRIDING THE USERNAME AND PASSWORD FOR DEV CONVENIENCE! THIS SHOULD BE REMOVED IN PROD")
            usernameAttempt = "meaf"
            passwordAttempt = "feam"
        }

        var data = login(usernameAttempt, passwordAttempt);
        if (data.status === "success") {
            setCurrentUser(data);
            if (data.isAdmin > 0) setCurrentPage(Page.AdminDashboard)
            else setCurrentPage(Page.ProfessorDashboard)
        } else {
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }
    }

    const doRegister = () => {
        setCurrentPage(Page.Register)
    }

    const dotempPass = () => {
        setCurrentPage(Page.TempPassword)
    }

    return (
        <div className="loginPage">
            <h3>Login</h3>
            <input type="text" id="username" placeholder="username" /><br />
            <input type="text" id="password" placeholder="password" /><br />
            <button type="button" onClick={doLogin}>Login</button>
            <button type="button" onClick={doRegister}>Register</button><br />
            <button type="button" onClick={dotempPass}>Forgot Password</button>
        </div>
    );
}

export default Login;