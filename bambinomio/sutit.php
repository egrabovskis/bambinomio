<?php
$to = "prvprvprv@gmail.com";
$msg = $_GET['msg'];
$from = $_GET['from'];
$subject = "New order";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg, 70);
$headers = "From: $from\r\n";
$headers .= "Content-type: text/html\r\n";

echo $msg;
// now lets send the email.
mail($to, $subject, $msg, $headers);

echo "Message has been sent....! --->" . $msg . "<--->" . $from . "<--->";