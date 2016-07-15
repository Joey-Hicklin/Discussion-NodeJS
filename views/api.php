<?php 
require "inc/connection.inc.php";
session_start();

function eD($data, $newRequest){ // AJAX data chainer
	if (!empty($data)){
		$data .= ','.$newRequest;
	} else{
		$data .= $newRequest;
	}
	return $data;
}

$data = ""; // Set to blank

//// BEFORE USING SESSION DATA, SET SESSION WITH AJAX UPON BUTTON-CLICK

if (strpos($_SESSION['workingPage'], 'respond')){ // If you are on the respond page...

	if (strpos($_SERVER['HTTP_REFERER'], 'mT') === false){ // As long as you aren't responding to the main topic...

		$data = eD($data,'"rS":"'.$_SESSION['rS'].'","rT":"'.$_SESSION['rT'].'","id":"'.$_SESSION['id'].'"'); // Set what you are replying to
	} else {
		$data = eD($data, '"rT":"mT"');
	}
	
}
if ($_COOKIE['loggedIn'] == 1){
	$email = $_COOKIE['email'];
	$lastMain = $db->query("SELECT post.DATETIME FROM post INNER JOIN user ON user.ID=post.USER_ID WHERE user.EMAIL='$email' AND (post.REPLY_POST IS NULL AND post.REPLY_STATEMENT IS NULL) ORDER BY DATETIME DESC LIMIT 1")->fetch_row()[0];

	$lastPost = $db->query("SELECT post.DATETIME FROM post INNER JOIN user ON user.ID=post.USER_ID WHERE user.EMAIL='$email' ORDER BY DATETIME DESC LIMIT 1")->fetch_row()[0];

	$lastRate = $db->query("SELECT rating.DATETIME FROM rating INNER JOIN user ON user.ID=rating.USER_ID WHERE user.EMAIL='$email' ORDER BY DATETIME DESC LIMIT 1")->fetch_row()[0];

	$data = eD($data, '"lastMain":"'.$lastMain.'","lastPost":"'.$lastPost.'","lastRate":"'.$lastRate.'"');
}

$data = eD($data,'"login":'.$_COOKIE['loggedIn']);
$data = "{".$data;
$data .= "}";
echo $data;
?>