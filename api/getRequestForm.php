<?php
    header("Access-Control-Allow-Headers: Content-type");
    header("Access-Control-Allow-Origin: *");

    include "database.php";

    $inputData = json_decode(file_get_contents('php://input'), true);

    $semester = $inputData["semester"];
    $empid = $inputData["empId"];

    $conn = mysqli_connect($host, $username, $password, $dbname);
    if($conn->connect_error) {
        die("Connection failed " . $conn->connect_error);
    }

    $sql = "SELECT * FROM requestForm WHERE semester=$semester AND empId=$empid;";

    // TODO: This puts the correct entry into Employee, but it also adds a blank row but only sometimes.
    // Doesn't hurt anyone but it'd be nice to fix

    $result = mysqli_query($conn, $sql);

    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo '{"empId":' . $row["empId"] . ', "semester":' . $row["semester"] . ', "requestId":' . $row["requestId"] . ', "books":[], "status":"success"}';
    } else {
        echo '{"status":"failure"}';
    }

    $conn->close();

?>