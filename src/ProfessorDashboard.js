import React from 'react';
import { Page } from './App.js';
import { deleteBooksFromRequestForm, getBooksFromRequestForm, getRequestForm } from './api.js';

const ProfessorDashboard = ({ setCurrentPage, currentUser, currentRequestForm, setCurrentRequestForm }) => {

    const updateTable = () => {
        if(currentRequestForm != null){
            console.log(currentRequestForm)
            document.getElementById("tableHeader").hidden = false
            document.getElementById("table").hidden = false
            document.getElementById("deleteSelected").hidden = false
            document.getElementById("tableHeader").innerHTML = "Book Request Form for semester " + currentRequestForm.semester
            document.getElementById("table").innerHTML = "<tr> <th></th> <th>ISBN</th> <th>Title</th> <th>Authors</th> <th>Edition</th> <th>Publisher</th> </tr>"
            var i = 0
            currentRequestForm.books.forEach(book => {
                document.getElementById("table").innerHTML += 
                '<tr> <td><input type="checkbox" id="check'+ i++ +'"></td><td> ' + book.isbn + 
                '</td> <td>' + book.title + 
                '</td> <td>' + book.authorNames + 
                '</td> <td>' + book.edition + 
                '</td> <td>' + book.publisher + '</td> </tr>'
            });
        }
    }

    const updateRequestForm = (semesterAttempt) => {
        var res = getRequestForm(semesterAttempt, currentUser.empId)
        if(res.status === "success"){
            setCurrentRequestForm(currentRequestForm = res)
            var bookres = getBooksFromRequestForm(currentRequestForm.requestId)
            console.log(bookres)
            currentRequestForm.books = bookres
            setCurrentRequestForm(currentRequestForm)
            updateTable()
        } else {
            setCurrentRequestForm(null)
            document.getElementById("tableHeader").hidden = true
            document.getElementById("table").hidden = true
            document.getElementById("deleteSelected").hidden = true
        }
    }

    const doGetRequestForm = () => {
        var semesterAttempt = document.getElementById("semesterEntry").value;
        if(semesterAttempt.length === 0) return;
        updateRequestForm(parseInt(semesterAttempt, 10))
    }

    const doDeleteSelected = () => {
        var i = 0
        var isbns = []
        currentRequestForm.books.forEach(book => {
            if(document.getElementById("check"+ i++).checked){
                isbns.push(book.isbn)
            }
        });
        console.log(isbns.join())
        var res = deleteBooksFromRequestForm(isbns.join(), currentRequestForm.requestId)
        console.log(res)
        updateRequestForm(currentRequestForm.semester)
    }

    return (
        <div className="loginPage">
            
            <h3>Professor Dashboard</h3>
            <p id="welcome">Welcome, Professor {currentUser.name}</p>
            <p id="empId">empId: {currentUser.empId}</p>
            <div style={{
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
            }}>
                <input type="text" id="semesterEntry" placeholder="semester" /><br />
                <button style={{ margin: "1em" }} type="button" onClick={doGetRequestForm}>View/Edit Request Form</button><br />
            </div>
            <p id="tableHeader" hidden={true}>Book Request Form for semester ?</p>
            <table id="table" hidden={true} border="1" className="center">
            </table>
            <button style={{ margin: "1em" }} type="button" id="deleteSelected" hidden={true} onClick={doDeleteSelected}>Delete Selected Books</button>
        </div>
    );
}

export default ProfessorDashboard;