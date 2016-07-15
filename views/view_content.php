<?php 
require "inc/connection.inc.php";
function statement($db, $content, $statementID, $postID, $customID){ ?>
	<div class="statement" id="f<?php echo $postID;?>s<?php echo $customID;?>"><!--
		--><div class="statementID"><?php echo $statementID; ?></div><!--
		--><div class="statementRatingSpace"><!--
		--></div><!--
		--><div class="statementContentBox"><!--
			--><div class="statementRatingBox noRating"><!--
				--><div class="statementRating"></div><!--
				--><div class="statementRating"></div><!--
				--><div class="statementRating"></div><!--
			--></div><!--END OF statementRatingBox DIV
			--><div class="statementContent"><span><?php echo $content; ?></span></div><!--END OF statementContent DIV-->
			<div class="statementBlackout">
				<div class="statementRateButton statementButton">RATE</div>
				<div class="statementViewButton statementButton">VIEW
					<div class="statementResponseNum"><?php echo $db->query("SELECT post.ID FROM post WHERE REPLY_STATEMENT='".$statementID."'")->num_rows; ?></div>
				</div><!--END OF statementView DIV-->
				<!--("SELECT post.ID FROM post WHERE REPLY_STATEMENT='".$statementID."'")->num_rows)-->
				<div class="statementRespondButton statementButton">RESPOND</div>
			</div><!--END OF statementBlackout DIV-->
		</div><!--END OF statementContentBox DIV-->
	</div><!--END OF statement DIV-->
<?php
} // END OF statement FUNCTION

function post($postID, $db, $customID){ ?>
<div class="post" id="p<?php echo $customID;?>">
	<div class="postID"><?php echo $postID ?></div>
	<?php 

	////  Use this area to differentiate viewing POST or STATEMENTS
	////  For POSTS do what's listed below
	////  For STATEMENTS change the $statementNum to 1, then have a mechanism that alters the sort order, so the stats on the statements are what is being sorted as the query is returned.
		$statements = $db->query("SELECT statement.CONTENT, statement.ID FROM statement WHERE statement.POST_ID='".$postID."'");

		for ($i=0; $i < $statements->num_rows; $i++) {
			$statementResponse = $statements->fetch_row();
			statement($db, $statementResponse[0],$statementResponse[1], $customID, $i);
			}		
	 ?>
	<div class="postRatingBox noRating"><!--
		--><div class="postRating"></div><!--
		--><div class="postRating"></div><!--
		--><div class="postRating"></div><!--
	--></div><!--END OF postRatingBox DIV-->
	<div class="postRateButton postButton">RATE</div>
	<div class="postViewButton postButton">VIEW
		<div class="postResponseNum"><?php echo $db->query("SELECT post.ID FROM post WHERE REPLY_POST='".$postID."'")->num_rows; ?></div>
	</div><!--END OF postView DIV-->
	<div class="postRespondButton postButton">RESPOND</div>
	<div class="postReadMore">Read More...</div>
</div><!--END OF post DIV-->
<?php } //END OF post FUNCTION ?>
<?php 

///////////   DISPLAY MACHINE   //////////////////


$query = "SELECT post.ID FROM post";

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	$V = $_POST['V'];  // view
	$VI = $_POST['VI']; // view In
	$S = $_POST['S']; // sort
	$D = $_POST['D']; // display num

	if ($_POST['LT'] !== "N"){
		$query .= " WHERE post.REPLY_".$_POST['LT']."='".$_POST['LID']."'";
	} else{
		$query .=  " JOIN main_topic ON post.MAIN_ID = main_topic.ID WHERE main_topic.QUEUE_NUM = '0' AND post.REPLY_POST IS NULL AND post.REPLY_STATEMENT IS NULL";
	}

} else {

	//DEFAULTS
	$V = "P"; // posts
	$VI = 0; // agreement
	$S = "H"; // highest rating
	$D = 5;

	$query .=  " JOIN main_topic ON post.MAIN_ID = main_topic.ID WHERE main_topic.QUEUE_NUM = '0' AND post.REPLY_POST IS NULL AND post.REPLY_STATEMENT IS NULL";
}

											// POSTS or STATEMENTS
// if ($_POST['V'] == 'P'){


// } elseif ($_POST['V'] == 'S') {
// 	# code...
// }

													// SORTER
// switch ($_POST['S']) {
// 	case 'H':
// 		//$query =. "ASC... rating amount"
// 		break;
	
// 	default:
// 		# code...
// 		break;
// }
?>
<?php
$query .= " AND post.AFFILIATION = '$VI'";
// $query = "SELECT post.ID FROM post JOIN main_topic ON post.MAIN_ID = main_topic.ID WHERE main_topic.QUEUE_NUM = '0' AND post.AFFILIATION = '$VI'";
$response = $db->query($query);
?>

<?php
for ($i=0; $i < $response->num_rows ; $i++) { 
	post($response->fetch_row()[0], $db, $i);
}
?>