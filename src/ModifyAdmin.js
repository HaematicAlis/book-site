import React from 'react';
import { Page } from './App.js'; 
import { createAdmin } from './api.js';
import { deleteAdmin } from './api.js';
import { changePassword } from './api.js';


const ModifyAdmin = ({setCurrentPage, currentUser}) => {

    const doCreateAdmin = () => {
        var usernameAttempt = document.getElementById("username").value;
        var passwordAttempt = document.getElementById("password").value;
        console.log("Calling make new admin with " + usernameAttempt + " and " + passwordAttempt)
        var result = createAdmin(usernameAttempt, passwordAttempt);
        console.log("Create admin result: " + result.status)

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
    }

    const doDeleteAdmin = () => {
        var usernameAttempt = document.getElementById("username").value;
        var passwordAttempt = document.getElementById("password").value;
        if(usernameAttempt === currentUser.username && passwordAttempt === currentUser.password) {
            document.getElementById("flair").hidden = false
            document.getElementById("flair").innerHTML = "You can't delete the account you're logged into!"
            return
        }
        
        console.log("Calling delete admin with " + usernameAttempt + " and " + passwordAttempt)
        var result = deleteAdmin(usernameAttempt, passwordAttempt);
        console.log("Delete admin result: " + result.status)

        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        document.getElementById("flair").hidden = false
        if(result.status === "DoesntExist")  document.getElementById("flair").innerHTML = "Account doesnt exist!"
        else if(result.status === "failure") document.getElementById("flair").innerHTML = "Failed to delete admin account."
        else if(result.status === "CantDeleteRoot") document.getElementById("flair").innerHTML = "You can't delete the root admin!"
        else if(result.status === "NotAdmin") document.getElementById("flair").innerHTML = "That's not an admin account!"
        else document.getElementById("flair").hidden = true   
    }
    
    const doChangePassword = () => {
        var passwordAttempt = document.getElementById("newPassword").value;
        document.getElementById("changeFlair").hidden = false   
        
        if(passwordAttempt.length === 0){
            document.getElementById("changeFlair").hidden = false   
            return
        }
        if(currentUser.isAdmin === 2) {
            document.getElementById("changeFlair").innerHTML = "You can't change the root password!"
            return;
        }
        console.log("Calling change password with " + passwordAttempt)
        var result = changePassword(currentUser.username, currentUser.password, passwordAttempt);
        console.log("Change password result: " + result.status)

        document.getElementById("newPassword").value = "";
        if(result.status === "failure") document.getElementById("changeFlair").innerHTML = "Failed to change password"
        else document.getElementById("changeFlair").hidden = true


    }

    const doGoBack = () => {
        setCurrentPage(Page.AdminDashboard)
    }

    return (
        <div className="loginPage">
            <h3>Modify Admin Accounts</h3>
            <p id="flair" hidden={true}>Hey!!!</p>
            <input type="text" id="username" placeholder="username"/><br />
            <input type="text" id="password" placeholder="password"/><br />
            <div style={{
                display: "flex", 
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <button style={{margin: "1em"}} type="button" onClick={doCreateAdmin}>Create</button><br />
                <button style={{margin: "1em"}} type="button" onClick={doDeleteAdmin}>Delete</button><br />
            </div>
            <h3>Change your password</h3>
            <p>Your username: {currentUser.username}</p>
            <p id="changeFlair" hidden={true}>Hey!!!</p>
            <input type="text" id="newPassword" placeholder="new password"/><br />
            <button type="button" onClick={doChangePassword}>Change Password</button><br />
            <br />
            <br />
            <button type="button" onClick={doGoBack}>Back To Dashboard</button><br />
        </div>
    );
}

export default ModifyAdmin;