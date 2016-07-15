<?php 
require "inc/connection.inc.php";
session_start();
$email = $_COOKIE['email'];
$type = $_POST['type'];
$ID = $_POST['id'];
$rating = $_POST['rating'];

if ($rating == "3"){
	$currentRating = $db->query("SELECT rating.RATING, rating.ID FROM rating INNER JOIN user ON user.ID=rating.USER_ID WHERE user.EMAIL='$email' AND rating.".$type."_ID='$ID' LIMIT 1")->fetch_row();
	echo $currentRating[0];
	$_SESSION['ratingID'] = $currentRating[1];

} elseif ($rating != "3"){
	$userID = $db->query("SELECT ID FROM user WHERE EMAIL='".$_COOKIE['email']."'")->fetch_row()[0];

	if (empty($_SESSION['ratingID']) || !isset($_SESSION['ratingID'])){
		if ($db->query("INSERT INTO rating (USER_ID, RATING,".$type."_ID) VALUES ('$userID','$rating','$ID')")){
			$_SESSION['ratingID'] = $db->insert_id;
		} else{
			echo $db->error;
		}
	} else{
		$oldID = $_SESSION['ratingID'];
		echo "new rating:(".$rating.")";
		if ($db->query("UPDATE rating INNER JOIN user ON user.ID=rating.USER_ID SET RATING='$rating' WHERE user.EMAIL='$email' AND rating.ID='$oldID'")){
			echo "Rating Updated!";
		} else{
			echo $db->error;
		}
	}
}
 ?>