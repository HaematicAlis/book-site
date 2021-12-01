import React from 'react';
import { login } from './api.js';

const Login = () => {
    const doLogin = () => {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        
        var data = login(username, password);
        document.getElementById("empId").innerHTML = 'empId: ' + data.empId;
        document.getElementById("isAdmin").innerHTML = 'isAdmin: ' + data.isAdmin;
        document.getElementById("status").innerHTML = 'status: ' + data.status;
    }

    return (
        <div className="loginPage">
            <h3>Login</h3>
            <input type="text" id="username" /><br />
            <input type="text" id="password" /><br />
            <button type="button" onClick={doLogin}>Login</button><br />
            <p id="empId">empId: ?</p>
            <p id="isAdmin">isAdmin: ?</p>
            <p id="status">status: none</p>
        </div>
    );
}

export default Login;