import React from 'react';
import { registerStaff } from './api.js';
import { Page } from './App.js'; 


const Register = ({setCurrentPage, setCurrentUser}) => {
	
    const doCreateStaff = () => {

		var usernameAttempt = document.getElementById("username").value;
        var passwordAttempt = document.getElementById("password").value;
        console.log("Calling make new staff with " + usernameAttempt + " and " + passwordAttempt)
        var result = registerStaff(usernameAttempt, passwordAttempt);
        console.log("Create staff result: " + result.status)
		
		document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        if(result.status === "AlreadyExists") {
            document.getElementById("flair").hidden = false
            document.getElementById("flair").innerHTML = "Account already exists!"
        } else if(result.status === "failure"){
            document.getElementById("flair").hidden = false
            document.getElementById("flair").innerHTML = "Failed to make new admin account."
        } else{
            document.getElementById("flair").hidden = true
        }
		
		setCurrentPage(Page.Login)

    }	
	
	
	
	return (
        <div className="registerPage">
			<p id="flair" hidden={true}>Hey!!!</p>
		
            <h3>Register</h3>
            <input type="text" id="username" placeholder="username"/><br />
            <input type="text" id="password" placeholder="password"/><br />
			<button type="button" onClick={doCreateStaff}>Register</button><br />
						
			
        </div>
    );
	
}

export default Register;