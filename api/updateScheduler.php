<?php
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");
// creates addtional blank row for some reason
include "database.php";

$inputData = json_decode(file_get_contents('php://input'), true);

$sid = $inputData["sid"];

$conn = mysqli_connect($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

$insertSql =  "UPDATE scheduler SET flag= 1 WHERE sid=$sid;";

if (mysqli_query($conn, $insertSql)) {
    echo '{"status":"success"}';
} else {
    echo '{"status":"failure"}';
}

$conn->close();
