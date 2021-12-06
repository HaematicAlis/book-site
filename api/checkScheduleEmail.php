<?php
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

include "database.php";

$inputData = json_decode(file_get_contents('php://input'), true);

$email = $inputData["email"];
$sDate = $inputData["sDate"];


$conn = mysqli_connect($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

$sql = "SELECT * FROM scheduler WHERE email='$email' AND schDate='$sDate' AND flag=0;";

$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
    echo '{"status":"AlreadyExists"}';
} 
else {
    echo '{"status":"NotExists"}';
}

$conn->close();
