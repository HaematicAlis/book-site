import React from 'react';
import Page from './App.js'
import { createBook, createRequestForm, deleteBooksFromRequestForm, deleteRequestForm, getBooksFromRequestForm, getRequestForm } from './api.js';

const ProfessorDashboard = ({ setCurrentPage, currentUser, setCurrentUser, currentRequestForm, setCurrentRequestForm }) => {

    const updateTable = () => {
        if (currentRequestForm != null) {
            console.log(currentRequestForm)
            document.getElementById("requestFormGroup").hidden = false
            document.getElementById("tableHeader").innerHTML = "Book Request Form for semester " + currentRequestForm.semester
            document.getElementById("table").innerHTML = ""
            var i = 0
            currentRequestForm.books.forEach(book => {
                document.getElementById("table").innerHTML +=
                    '<tr' + (i % 2 === 0 ? ' style="background-color: rgb(221, 221, 221)"' : '') +
                    '> <td><input type="checkbox" id="check' + i++ + '"></td><td> ' + book.isbn +
                    '</td> <td>' + book.title +
                    '</td> <td>' + book.authorNames +
                    '</td> <td>' + book.edition +
                    '</td> <td>' + book.publisher + '</td> </tr>'
            });

        }
    }

    const updateRequestForm = (semesterAttempt) => {
        var res = getRequestForm(semesterAttempt, currentUser.empId)
        console.log("get request form result: " + res)
        if (res.status === "success") {
            document.getElementById("flair").hidden = true
            document.getElementById("createRequest").hidden = true
            setCurrentRequestForm(currentRequestForm = res)
            var bookres = getBooksFromRequestForm(currentRequestForm.requestId)
            console.log(bookres)
            currentRequestForm.books = bookres
            setCurrentRequestForm(currentRequestForm)
            updateTable()
        } else {
            setCurrentRequestForm(null)
            document.getElementById("flair").hidden = false
            document.getElementById("createRequest").hidden = false
            document.getElementById("flair").innerHTML = "Failed to find request form for semester " + semesterAttempt
            document.getElementById("requestFormGroup").hidden = true
        }
    }

    const doGetRequestForm = () => {
        var semesterAttempt = document.getElementById("semesterEntry").value;
        if (semesterAttempt.length === 0) return;
        updateRequestForm(parseInt(semesterAttempt, 10))
    }

    const doDeleteSelected = () => {
        var i = 0
        var isbns = []
        currentRequestForm.books.forEach(book => {
            if (document.getElementById("check" + i++).checked) {
                isbns.push(book.isbn)
            }
        });
        console.log(isbns.join())
        var res = deleteBooksFromRequestForm(isbns.join(), currentRequestForm.requestId)
        console.log(res)
        updateRequestForm(currentRequestForm.semester)
    }

    const doDeleteRequestForm = () => {
        var isbns = []
        currentRequestForm.books.forEach(book => {
            isbns.push(book.isbn)
        });
        deleteBooksFromRequestForm(isbns.join(), currentRequestForm.requestId)
        deleteRequestForm(currentRequestForm.requestId)
        setCurrentRequestForm(null)
        document.getElementById("requestFormGroup").hidden = true
    }

    const doAddNewBook = () => {
        var isbn = parseInt(document.getElementById("isbnEntry").value, 10);
        var title = document.getElementById("titleEntry").value;
        var author = document.getElementById("authorEntry").value;
        var edition = parseInt(document.getElementById("editionEntry").value, 10);
        var publisher = document.getElementById("publisherEntry").value;
        createBook(isbn, title, author, edition, publisher, currentRequestForm.requestId)
        updateRequestForm(currentRequestForm.semester)
    }

    const doCreateRequestForm = () => {
        var newSemester = parseInt(document.getElementById("semesterEntry").value)
        var res = createRequestForm(currentUser.empId, newSemester)
        if (res.status === "success") {
            document.getElementById("flair").hidden = true
            document.getElementById("createRequest").hidden = true
            updateRequestForm(newSemester)
        } else {
            document.getElementById("flair").hidden = false
            document.getElementById("flair").innerHTML = "Failed to create request form for semester " + newSemester
        }
    }

    const doLogout = () => {
        setCurrentPage(Page.Login)
        setCurrentUser(null)
        setCurrentRequestForm(null)
    }

    return (
        <div className="loginPage">

            <h3>Professor Dashboard</h3>
            <p id="welcome">Welcome, Professor {currentUser.name}</p>
            <div style={{
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
            }}>
                <p id="flair" hidden={true}>Couldn't find a Request Form for semester ? </p>
                <button style={{ margin: "1em" }} id="createRequest" hidden={true} type="button" onClick={doCreateRequestForm}>Create New</button><br />
            </div>
            <div style={{
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
            }}>
                <input type="text" id="semesterEntry" placeholder="semester" /><br />
                <button style={{ margin: "1em" }} type="button" onClick={doGetRequestForm}>View/Edit Request Form</button><br />
            </div>
            <table className="center" style={{ border: "2px solid grey" }} id="requestFormGroup" hidden={true}> <tbody> <tr> <td>
                <h3 id="tableHeader"> <u>Book Request Form for semester ?</u></h3>
                <table style={{ border: "2px solid grey" }} className="center">
                    <thead>
                        <tr>
                            <th></th> <th>ISBN</th> <th>Title</th> <th>Authors</th> <th>Edition</th> <th>Publisher</th>
                        </tr>
                    </thead>
                    <tbody id="table">

                    </tbody>
                </table>
                <br />
                <div id="newBookEntry" >
                    <table className="center" style={{ border: "2px solid grey" }}>
                        <tbody>
                            <tr><td></td><th>Add New Book</th></tr>
                            <tr>
                                <td><input type="text" id="isbnEntry" placeholder="isbn" /></td>
                                <td><input type="text" id="titleEntry" placeholder="title" /></td>
                                <td><input type="text" id="authorEntry" placeholder="author(s)" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" id="editionEntry" placeholder="edition" /></td>
                                <td><input type="text" id="publisherEntry" placeholder="publisher" /></td>
                                <td><button type="button" className="greenbutton" onClick={doAddNewBook}>Add New Book</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{
                    display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
                }}>
                    <button style={{ margin: "1em" }} type="button" id="deleteSelected" onClick={doDeleteSelected}>Delete Selected Books</button>
                    <button style={{ margin: "1em" }} type="button" id="deleteRequestForm" className="redbutton" onClick={doDeleteRequestForm}>Delete Request Form</button><br />
                </div>
            </td></tr></tbody></table>
            <button style={{ margin: "1em" }} type="button" className="redbutton" onClick={doLogout}>Logout</button><br />
        </div>
    );
}

export default ProfessorDashboard;