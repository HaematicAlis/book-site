<?php
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

include "database.php";

$inputData = json_decode(file_get_contents('php://input'), true);

$semester = $inputData["semester"];
$empid = $inputData["empId"];

$conn = mysqli_connect($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

$insertSql = "INSERT INTO requestform (semester, empId) VALUES ($semester, $empid)";

if (mysqli_query($conn, $insertSql)) {
    echo '{"status":"success"}';
} else {
    echo '{"status":"failure"}';
}

$conn->close();
