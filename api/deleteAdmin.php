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
$deleteSql =  "DELETE FROM employee WHERE username='" . $user . "' AND password='" . $pass . "';";

$checkResult = mysqli_query($conn, $checkSql);

if ($checkResult->num_rows > 0) {
    $row = $checkResult->fetch_assoc();
    if ($row["isAdmin"] == 2) echo '{"status":"CantDeleteRoot"}';
    else if ($row["isAdmin"] == 0) echo '{"status":"NotAdmin"}';
    else if (mysqli_query($conn, $deleteSql)) echo '{"status":"success"}';
    else echo '{"status":"failure"}';
} else echo '{"status":"DoesntExist"}';

$conn->close();
