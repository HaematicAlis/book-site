import React from 'react';
import { tempPassword } from './api.js';
import { Page } from './App.js'; 

const TempPassword = ({setCurrentPage, setCurrentUser}) => {
	

    const doSendEmail = () => {

    }	
	
	return (
        <div className="tempPassword">
			
		
            <h3>Reset Password</h3>
            <input type="text" id="email" placeholder="email"/><br />
			<button type="button" onClick={doSendEmail}>Send Email</button><br />
						
			
        </div>
    );
	
	
}
export default TempPassword;