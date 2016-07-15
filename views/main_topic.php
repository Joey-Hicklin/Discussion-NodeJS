<?php
require "inc/head.inc.php";
head("NullSpeak - Main Topic");
require "inc/requires.inc.php";
?>
	<div id="archiveNav">
		<div class="archiveButton archiveButtonLeft">&#8636;</div>
		<div class="archiveTitle">ARCHIVES</div>
		<div class="archiveButton archiveButtonRight">&#8641;</div>
	</div><!--END OF archiveNav DIV-->

	<div class="mainTopicFront"><?php echo($db->query("SELECT TOPIC FROM main_topic WHERE QUEUE_NUM='0'")->fetch_assoc()['TOPIC']); ?></div>
	<a class="previousDiscussions simpleLink" href="#">Previous Discussions</a>
	<div class="mainRespondButton mainButton">RESPOND</div>
	<a class="viewButton mainButton" href="view.php">VIEW</div>

</body>
</html>