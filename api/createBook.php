<?php
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

include "database.php";

$inputData = json_decode(file_get_contents('php://input'), true);

$isbn = $inputData["isbn"];
$title = $inputData["title"];
$authors = $inputData["authorNames"];
$edition = $inputData["edition"];
$publisher = $inputData["publisher"];
$reqid = $inputData["requestId"];

$conn = mysqli_connect($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

$checkSql = "SELECT * FROM book WHERE isbn=$isbn;";
$insertSql = "INSERT INTO book (isbn, title, authorNames, edition, publisher, requestId) VALUES ($isbn, '$title', '$authors', $edition, '$publisher', $reqid)";

$checkResult = mysqli_query($conn, $checkSql);

if ($checkResult->num_rows > 0) {
    echo '{"status":"AlreadyExists"}';
} else if (mysqli_query($conn, $insertSql)) {
    echo '{"status":"success"}';
} else {
    echo '{"status":"failure"}';
}

$conn->close();
