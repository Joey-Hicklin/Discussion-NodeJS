<?php 
require "inc/connection.inc.php";
$type = $_POST['type'];
$ID = $_POST['id'];
$email = $_COOKIE['email'];
echo $db->query("SELECT RATING FROM rating WHERE ".$type."_ID='".$ID."'")->num_rows;
echo "!";
echo $db->query("SELECT RATING FROM rating WHERE ".$type."_ID='".$ID."' AND rating.RATING='0'")->num_rows;
echo "!";
echo $db->query("SELECT RATING FROM rating WHERE ".$type."_ID='".$ID."' AND rating.RATING='1'")->num_rows;
echo "!";
echo $db->query("SELECT RATING FROM rating WHERE ".$type."_ID='".$ID."' AND rating.RATING='2'")->num_rows;
echo "!";
echo $db->query("SELECT rating.DATETIME FROM rating INNER JOIN user ON user.ID=rating.USER_ID WHERE user.EMAIL='$email' ORDER BY DATETIME DESC LIMIT 1")->fetch_row()[0];
 ?>