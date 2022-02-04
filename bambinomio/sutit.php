<?php
$msg = $_POST['msg'];
$from = $_POST['from'];

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg, 70);
$headers = 'From: ' . $from;

// send email
mail("valdis.prodnieks@bambinomio.lv", "Test order", $msg, $headers);