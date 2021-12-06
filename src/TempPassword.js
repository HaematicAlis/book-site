import React from 'react';
import { getTempPassword, sendEmail } from './api.js';
import { Page } from './App.js';

const TempPassword = ({ setCurrentPage, setCurrentUser }) => {


    const doSendEmail = () => {
		
		var usernameAttempt = document.getElementById("username").value;
		var recpt = document.getElementById("email").value;
		var passwordAttempt = randPassword(6);
		
		
		document.getElementById("changeFlair").hidden = false

        if (passwordAttempt.length === 0) {
            document.getElementById("changeFlair").hidden = false
            return
		}
		if (recpt.length === 0) {
            document.getElementById("changeFlair").hidden = false
            return
		}
		if (usernameAttempt.length === 0) {
            document.getElementById("changeFlair").hidden = false
            return
		}
		
		console.log("Calling getTempPassword with " + passwordAttempt + "AND" + usernameAttempt + "and" + recpt )
        var result = getTempPassword(usernameAttempt, passwordAttempt, recpt);
        console.log("Change password result: " + result.status)

        
        if (result.status === "failure") document.getElementById("changeFlair").innerHTML = "Failed to change password"
        else document.getElementById("changeFlair").hidden = true

		
		var message = ""
        message = '<html><body>';
        message += '<h3>Your new temporary password is below:</h3>'
		message += passwordAttempt + ''
        message += '</body></html>';
		sendEmail([recpt], "Password change for" + usernameAttempt, message)
		
		setCurrentPage(Page.Login)
    }
	
	function randPassword(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * 
			charactersLength));
		}
	return result;
	}
	
	const prevPage = () => {
		setCurrentPage(Page.Login)
	}



    return (
        <div className="tempPassword">

			<p id="changeFlair" hidden={true}>Fill in all fields!!!</p>
            <h3>Reset Password</h3>
			<input type="text" id="username" placeholder="username" /><br />
            <input type="text" id="email" placeholder="email" /><br />
            <button type="button" onClick={doSendEmail}>Send Email</button>
			<button type="button" onClick={prevPage}>Go Back</button><br />
			
			
        </div>
    );


}
export default TempPassword;