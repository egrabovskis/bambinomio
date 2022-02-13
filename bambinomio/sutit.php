<?php
$to = "order@bambinomio.lv";
$msg = $_GET['msg'];
$from = $_GET['from'];
$subject = "Jauns pasūtījums no " . $from;

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg, 70);
$headers = "Content-type: text/html; charset=UTF-8\r\n";

// now lets send the email.
mail($to, $subject, $msg, $headers);

echo "Nosūtīts epasts no: " . $from . ", kam:" . $to . ", saturs:" . $msg;
