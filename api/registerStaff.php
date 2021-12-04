<?php
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

include "database.php";

$inputData = json_decode(file_get_contents('php://input'), true);

$user = $inputData["username"];
$pass = $inputData["password"];

$conn = mysqli_connect($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

$checkSql = "SELECT * FROM employee WHERE username='" . $user . "' AND password='" . $pass . "';";
$insertSql = "INSERT INTO Employee (username, password, isAdmin) VALUES ('$user', '$pass', 0)";

$checkResult = mysqli_query($conn, $checkSql);

if ($checkResult->num_rows > 0) {
    echo '{"status":"AlreadyExists"}';
} else if (mysqli_query($conn, $insertSql)) {
    echo '{"status":"success"}';
} else {
    echo '{"status":"failure"}';
}

$conn->close();
