<?php
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

include "database.php";

$inputData = json_decode(file_get_contents('php://input'), true);

// $sDate = $inputData["date"];
$today = date('Y-m-d');

$conn = mysqli_connect($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

$sql = "SELECT * FROM scheduler WHERE flag = 0 AND schDate <= '$today' AND email !='';";
// $modifySql =  "UPDATE scheduler SET `flag`= 1 WHERE sDate=$sDate;";

// $update = mysqli_query($conn, $modifySql)
$result = mysqli_query($conn, $sql);

$emparray = array();
while ($row = mysqli_fetch_assoc($result)) {
    $emparray[] = $row;
}
echo '{"status":"success", "sch":' . json_encode($emparray) . "}";

$conn->close();
