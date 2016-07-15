<?php
require "inc/connection.inc.php";

if ($_SERVER['REQUEST_METHOD']=="POST"){
	echo "<pre>";
	var_dump($_POST);
	echo "</pre>";
	$email = $_POST['email'];
	if ($_POST['password'] != "!"){
		$password = $_POST['password'];
	}
	if (($db->query("SELECT EMAIL FROM user WHERE EMAIL=\"".$email."\"")->fetch_row()[0]) == $email){
		echo "exists";
	} elseif ($password != $_POST['verifyPassword']){
		echo "passMatch";
	} else if ($db->query("INSERT INTO user (EMAIL, PASSWORD) VALUES (\"".$email."\", \"".$password."\")")) {
		echo "success";
	} else {
		var_dump($db->error_list);
	}
}
?>