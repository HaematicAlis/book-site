<?php
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

include "database.php";

/* $inputData = json_decode(file_get_contents('php://input'), true);
 */
/* $isAdmin = $inputData["isAdmin"];
 */
$conn = mysqli_connect($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

$sql = "SELECT * FROM employee WHERE isAdmin=0;";

$result = mysqli_query($conn, $sql);

$emparray = array();
while ($row = mysqli_fetch_assoc($result)) {
    $emparray[] = $row;
}
echo '{"status":"success", "employ":' . json_encode($emparray) . "}";

$conn->close();
