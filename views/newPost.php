<?php
require "inc/connection.inc.php";
session_start();

$userID = $db->query("SELECT ID FROM user WHERE EMAIL='".$_COOKIE['email']."'")->fetch_row()[0]; // get the users email
$mainID = $db->query("SELECT ID FROM main_topic WHERE QUEUE_NUM='0'")->fetch_row()[0]; // get the current main topic

switch ($_SESSION['rT']) { // get what is the post in response to

	case 'P': // if it's in response to a post...
		$replyOf = ", REPLY_POST"; // set the SQL for the "REPLY TO" column in the POST table
		$replyID = ",'".$_SESSION['id']."'"; // get the ID of the post that is being responded to
		break;
	
	case 'S': // if it's in response to a statement...
		$replyOf = ", REPLY_STATEMENT";
		$replyID = ",'".$_SESSION['id']."'";
		break;

	default: // if it's in response to the main topic itself...
		$replyOf = ""; // leave blank, since there will be no entry in the "REPLY TO" column, leaving both sections as NULL
		$replyID = "";
}

////////   SEND DATA TO post TABLE   /////////////////
if($db->query("INSERT INTO post (USER_ID, MAIN_ID, AFFILIATION".$replyOf.") VALUES ('".$userID."','".$mainID."','".$_SESSION['rS']."'".$replyID.")")) { // rS is the style in which the response is being made. 0=agree, 1=neutral, 2=disagree
	echo "POST LINK SUCCESS!!";
	$postID = $db->query("SELECT LAST_INSERT_ID()")->fetch_row()[0]; // save current post ID, to link statements
	
	////////   SEND DATA TO statement TABLE   ////////////////
	$statements = str_ireplace("'", "''",$_POST['postContent']); // escape single quotes for SQL statement
	$statements = explode("~^", $statements); // split into individual statements
	for ($i=0; $i < count($statements); $i++) {
		if ($db->query("INSERT INTO statement (POST_ID, CONTENT) VALUES ('".$postID."','".htmlspecialchars($statements[$i])."')")) {
			echo "\nSTATEMENT ".$i." LINK SUCCESS!!";
		} else{
			echo $db->error;
		}
	}
} else{
	echo $db->error;
}
