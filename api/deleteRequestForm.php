<?php
    header("Access-Control-Allow-Headers: Content-type");
    header("Access-Control-Allow-Origin: *");

    include "database.php";

    $inputData = json_decode(file_get_contents('php://input'), true);

    $reqid = $inputData["requestId"];

    $conn = mysqli_connect($host, $username, $password, $dbname);
    if($conn->connect_error) {
        die("Connection failed " . $conn->connect_error);
    }

    $sql = "DELETE FROM requestform WHERE requestId=$reqid;";

    if(mysqli_query($conn, $sql)) echo '{"status":"success"}';
    else echo '{"status":"failure"}';

    $conn->close();

?>