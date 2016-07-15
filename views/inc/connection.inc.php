<?php 

$db = new mysqli('localhost','root','','discussion');

if ($db->connect_error) {
	$error = $db->connect_error;
}

$db->set_charset('utf8');