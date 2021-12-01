<?php
    header("Access-Control-Allow-Headers: Content-type");
    header("Access-Control-Allow-Origin: *");

    include "database.php";

    $inputData = json_decode(file_get_contents('php://input'), true);

    $user = $inputData["username"];
    $pass = $inputData["password"];

    $conn = mysqli_connect($host, $username, $password, $dbname);
    if($conn->connect_error) {
        die("Connection failed " . $conn->connect_error);
    }

    $query = "SELECT empId, isAdmin FROM employee WHERE username='" . $user . "' AND password='" . $pass . "';";
    $result = mysqli_query($conn, $query);

    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo '{"empId":' . $row["empId"] . ', "isAdmin":' . $row["isAdmin"] . ', "status":"success"}';
    } else {
        echo '{"status":"failure"}';
    }
?>