<?php 
function head($title){ ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><?php echo $title; ?></title>
	<link rel="stylesheet" href="css/style.css">
	<link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	<script src="//cdn.jsdelivr.net/jquery.color-animation/1/mainfile"></script>
	<!-- script.js is below the blackouts -->
	<?php session_start(); ?>
</head>
<body>
<?php } ?>