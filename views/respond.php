<?php
require "inc/head.inc.php";
head("NullSpeak - Respond");
require "inc/requires.inc.php";
?>
<?php 
	if (isset($_GET['rT'])){
		$_SESSION['rT'] = $_GET['rT'];
	} 
	// else{
	// 	unset($_SESSION['rT']);
	// }
	if (isset($_GET['id'])){
		$_SESSION['id'] = $_GET['id'];
	} 
	// else{
	// 	unset($_SESSION['id']);
	// }
 ?>
<div class="respondSubjectBox">
	<div class="respondSubjectButton">View Topic</div>
	<span>I <?php
		if (isset($_GET['rS'])){
			$_SESSION['rS'] = $_GET['rS'];
			if ($_GET['rS'] == '0'){
				echo "agree";
			} elseif ($_GET['rS'] == '1'){
				echo "am neutral";
			} elseif ($_GET['rS'] == '2'){
				echo "disagree";
			}
		}
	?> because:</span>
</div>
<form class="postFormBox" action="test.php" id="postNew" method="post">
	<div class="statementInputBox cloneBox">
		<textarea class="statementInput clone" form="postNew" rows="4" maxlength="350" name="statements[]" autofocus></textarea>
		<div class="simpleLink newStatement cloneButton">Add another statement</div>
	</div><!--END OF statementInputBox DIV-->
	<input class="reviewPostButton" type="button" value="REVIEW POST">
</form>