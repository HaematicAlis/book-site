export const urlBase = 'http://localhost/book-site/api';

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

export const registerStaff = (username, password) => {
    var jsonDict = { username: username, password: password };
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
        if(jsonObject.status === "success") return jsonObject.books;
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