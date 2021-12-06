import React from 'react';
import { getBooksFromRequestForm, getEmployeeById, getRequestForms, sendEmail } from './api.js';
import { Page } from './App.js';

const AdminDashboard = ({ setCurrentPage, currentUser, setCurrentUser }) => {

    const doGoToModifyAdmin = () => {
        setCurrentPage(Page.ModifyAdmin);
    }

    const doGoToRequests = () => {
        setCurrentPage(Page.Requests);
    }

    const addRequestFormToTable = (requestForm, i) => {
        var books = getBooksFromRequestForm(requestForm.requestId)
        var employee = getEmployeeById(requestForm.empId)
        if (employee === null) return;

        books.forEach(book => {
            document.getElementById("table").innerHTML +=
                '<tr' + (i % 2 === 0 ? ' style="background-color: rgb(221, 221, 221)"' : '') +
                '> <td>' + employee.name +
                '</td> <td>' + book.isbn +
                '</td> <td>' + book.title +
                '</td> <td>' + book.authorNames +
                '</td> <td>' + book.edition +
                '</td> <td>' + book.publisher + '</td> </tr>'
            i++
        });
        return i
    }

    const updateTable = (requestForms) => {
        document.getElementById("table").innerHTML = ""
        var i = 0
        requestForms.forEach(form => {
            i = addRequestFormToTable(form, i)
        })
    }

    const updateRequestForms = (semesterAttempt) => {
        var res = getRequestForms(semesterAttempt)
        console.log("get request form result: " + res)
        if (res.status === "success") {
            document.getElementById("requestFormGroup").hidden = false
            document.getElementById("tableHeader").innerHTML = "All Book Requests for Semester " + semesterAttempt
            updateTable(res.forms)
        } else {
            document.getElementById("requestFormGroup").hidden = true
        }
    }

    const doGetRequestForms = () => {
        var semesterAttempt = document.getElementById("semesterEntry").value;
        if (semesterAttempt.length === 0) return;
        updateRequestForms(parseInt(semesterAttempt, 10))
    }

    const doSendRequestFormEmail = () => {
        var recpt = document.getElementById("emailEntry").value
        var semester = parseInt(document.getElementById("semesterEntry").value, 10)
        var message = ""
        message = '<html><body>';
        message += '<h3>The list of all book requests for semester ' + semester + ' are shown below: </h3>'
        message += document.getElementById("requestTable").outerHTML + ''
        message += '<a href="http://localhost:3000">Go to book order website</a>';
        message += '</body></html>';
        sendEmail([recpt], "Book Orders for UCF Semester " + semester, message)
    }

    const doLogout = () => {
        setCurrentPage(Page.Login)
        setCurrentUser(null)
    }

    return (
        <div className="loginPage">
            <h3>Admin Dashboard</h3>
            <p id="welcome">Welcome, {currentUser.username}</p>
            <button type="newAdminButton" onClick={doGoToModifyAdmin}>Modify Admin Accounts</button><br />
            <br/>
            <button type="newAdminButton" onClick={doGoToRequests}>Reminders/Requests</button><br />
            <div style={{
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
            }}>
                <input type="text" id="semesterEntry" placeholder="semester" /><br />
                <button style={{ margin: "1em" }} type="button" onClick={doGetRequestForms}>View Request Forms</button><br />
            </div>
            <table className="center" style={{ border: "2px solid grey", borderCollapse: "collapse" }} id="requestFormGroup" hidden={true}> <tbody> <tr> <td>
                <h3 id="tableHeader"> <u>Book Request Form for semester ?</u></h3>
                <table id="requestTable" style={{ border: "2px solid grey" }} className="center">
                    <thead>
                        <tr>
                            <th>Professor Name</th> <th>ISBN</th> <th>Title</th> <th>Authors</th> <th>Edition</th> <th>Publisher</th>
                        </tr>
                    </thead>
                    <tbody id="table">

                    </tbody>
                </table>
                <br />
                <div style={{
                    display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
                }}>
                    <input type="text" id="emailEntry" placeholder="email" /><br />
                    <button style={{ margin: "1em" }} type="button" onClick={doSendRequestFormEmail}>Send Final List</button><br />
                </div>
            </td></tr></tbody></table>
            <button style={{ margin: "1em" }} type="button" className="redbutton" onClick={doLogout}>Logout</button><br />
        </div>
    );
}

export default AdminDashboard;