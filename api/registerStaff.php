<?php
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

include "database.php";

$inputData = json_decode(file_get_contents('php://input'), true);

$user = $inputData["username"];
$pass = $inputData["password"];
$name = $inputData["name"];
$email = $inputData["email"];

$conn = mysqli_connect($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

$checkLoginSql = "SELECT * FROM employee WHERE username='" . $user . "' AND password='" . $pass . "';";
$checkEmailSql = "SELECT * FROM employee WHERE email='" . $email . "';";
$insertSql = "INSERT INTO Employee (username, password, isAdmin, email, name) VALUES ('$user', '$pass', 0, '$email', '$name')";

$checkLoginResult = mysqli_query($conn, $checkLoginSql);
$checkEmailResult = mysqli_query($conn, $checkEmailSql);

if ($checkLoginResult->num_rows > 0) {
    echo '{"status":"LoginExists"}';
} else if ($checkEmailResult->num_rows > 0) {
    echo '{"status":"EmailExists"}';
} else if (mysqli_query($conn, $insertSql)) {
    echo '{"status":"success"}';
} else {
    echo '{"status":"failure"}';
}

$conn->close();
