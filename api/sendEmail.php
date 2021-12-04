<?php
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

$inputData = json_decode(file_get_contents('php://input'), true);

$to = $inputData["recipients"];
$subject = $inputData["subject"];
$message = $inputData["message"];

$headers = 'From: ucfbookorders@gmail.com' . "\r\n" .
    'Reply-To: ucfbookorders@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n";

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully!';
} else {
    die('Failure: Email was not sent!');
}
