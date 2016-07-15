<?php
function stickyText($name){
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		if (!empty($_POST[$name])){
			echo $_POST[$name];
		}
	}
}
function stickySelect($selectName, $optionName){
	if ($_SERVER['REQUEST_METHOD']=='POST'){
		if (isset($_POST[$selectName])){
			if ($_POST[$selectName]==$optionName){
				echo 'selected="selected"';
			}
		}
	}
}
?>