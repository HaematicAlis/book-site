export const urlBase = 'http://localhost/book-site/api';

export const sendEmail = (recipients, subject, message) => {
    var jsonDict = { recipients: recipients.join(), subject: subject, message: message };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/sendEmail.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = xhr.responseText;
        return jsonObject;
    } catch (err) {
        return null;
    }
}


var xhr;

const connect = (type, url) => {
    xhr = new XMLHttpRequest();
    xhr.open(type, url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
}

export const login = (username, password) => {
    var jsonDict = { username: username, password: password };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/login.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject;
    } catch (err) {
        return null;
    }
}

export const createAdmin = (username, password) => {
    var jsonDict = { username: username, password: password };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/createAdmin.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject;
    } catch (err) {
        return null;
    }
}

export const registerStaff = (username, password, name, email) => {
    var jsonDict = { username: username, password: password, name: name, email: email};
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/registerStaff.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject;
    } catch (err) {
        return null;
    }
}

export const deleteAdmin = (username, password) => {
    var jsonDict = { username: username, password: password };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/deleteAdmin.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject;
    } catch (err) {
        return null;
    }
}

export const changePassword = (username, oldPassword, newPassword) => {
    var jsonDict = { username: username, oldPassword: oldPassword, newPassword: newPassword };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/changePassword.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject;
    } catch (err) {
        return null;
    }
}

export const getTempPassword = (username, newPassword, email) => {
    var jsonDict = { username: username, newPassword: newPassword, email: email };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/getTempPassword.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject;
    } catch (err) {
        return null;
    }
}

export const getRequestForm = (semester, empId) => {
    var jsonDict = { semester: semester, empId: empId };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/getRequestForm.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject;
    } catch (err) {
        return null;
    }
}

export const getRequestForms = (semester) => {
    var jsonDict = { semester: semester };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/getRequestForms.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject;
    } catch (err) {
        return null;
    }
}

export const getBooksFromRequestForm = (requestId) => {
    var jsonDict = { requestId: requestId };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/getBooksFromRequestForm.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.status === "success") return jsonObject.books;
        else return null;
    } catch (err) {
        return null;
    }
}

export const deleteBooksFromRequestForm = (isbns, requestId) => {
    var jsonDict = { isbns: isbns, requestId: requestId };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/deleteBooksFromRequestForm.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }
}

export const deleteRequestForm = (requestId) => {
    var jsonDict = { requestId: requestId };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/deleteRequestForm.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }
}

export const createBook = (isbn, title, authorNames, edition, publisher, requestId) => {
    var jsonDict = { isbn: isbn, title: title, authorNames: authorNames, edition: edition, publisher: publisher, requestId: requestId };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/createBook.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }
}

export const createRequestForm = (empId, semester) => {
    var jsonDict = { empId: empId, semester: semester };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/createRequestForm.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }
}

export const getEmployeeById = (empId) => {
    var jsonDict = { empId: empId };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/getEmployeeById.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }
}

export const getAllProfessors = (/* isAdmin */) => {
/*     var jsonDict = { isAdmin: 0 };
    var jsonPayload = JSON.stringify(jsonDict);
 */
    var url = urlBase + '/getAllProfessors.php';
    connect("POST", url);

    try {
        console.log("Sending payload for getAllProfessor" /* + jsonPayload */);
        xhr.send(/* jsonPayload */);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }

   
}

export const createScheduleEmail = (email, sDate) => {
    var jsonDict = { email: email, sDate: sDate };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/createScheduleEmail.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }
}

export const checkScheduleEmail = (email, sDate) => {
    var jsonDict = { email: email, sDate: sDate };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/checkScheduleEmail.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }
}

export const runScheduler = (/* date */) => {
    // var jsonDict = { date: date };
    // var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/runScheduler.php';
    connect("POST", url);

    try {
        console.log("Sending payload "  /* jsonPayload */);
        xhr.send(/* jsonPayload */);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }
}

export const updateScheduler = (sid) => {
    var jsonDict = { sid : sid };
    var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/updateScheduler.php';
    connect("POST", url);

    try {
        console.log("Sending payload " + jsonPayload);
        xhr.send(jsonPayload);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }
}

export const removeBlankEmail = (/* date */) => {
    // var jsonDict = { date: date };
    // var jsonPayload = JSON.stringify(jsonDict);

    var url = urlBase + '/removeBlankEmail.php';
    connect("POST", url);

    try {
        console.log("Sending payload "  /* jsonPayload */);
        xhr.send(/* jsonPayload */);
        console.log("api response " + xhr.responseText);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject
    } catch (err) {
        return null;
    }
}
