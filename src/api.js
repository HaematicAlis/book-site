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
        xhr.send(jsonPayload);
        var jsonObject = JSON.parse(xhr.responseText);
        return jsonObject;
    } catch (err) {
        return null;
    }
}