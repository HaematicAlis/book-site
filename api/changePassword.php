<?php
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

include "database.php";

$inputData = json_decode(file_get_contents('php://input'), true);

$user = $inputData["username"];
$oldpass = $inputData["oldPassword"];
$newpass = $inputData["newPassword"];

$conn = mysqli_connect($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

$modifySql =  "UPDATE employee SET `password`='" . $newpass . "' WHERE username='" . $user . "' AND password='" . $oldpass . "';";

if (mysqli_query($conn, $modifySql)) echo '{"status":"success"}';
else echo '{"status":"failure"}';

$conn->close();
