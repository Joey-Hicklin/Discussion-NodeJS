<?php 
require "inc/connection.inc.php";
echo $db->query("SELECT post.ID FROM post WHERE REPLY_".$_POST['type']."='".$_POST['id']."' AND post.AFFILIATION = '".$_POST['aff']."'")->num_rows;
 ?>