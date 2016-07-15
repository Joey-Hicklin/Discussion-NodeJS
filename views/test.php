<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Test Connections and Queries</title>
</head>
<body>
	<?php 
try {
	require_once 'inc/connection.inc.php';
	// $keys = [];
	// $values = [];
	// foreach (($db->query("SELECT * FROM user")->fetch_object()) as $key => $value) {
	// 	if ($key != "ID"){
	// 		array_push($keys, $key);
	// 		array_push($values, "'".$value."'");
	// 	}
	// 	echo "<br>Key: ".$key." /// Value: ".$value;
	// }
	// $keys = implode(", ", $keys);
	// $values = implode(", ", $values);
	// if ($db->query("INSERT INTO user ($keys) VALUES ($values)")){
	// 	echo "<br>Yeppers!";
	// } else{
	// 	echo "<p class=\"adminError formError\">Error description: " . mysqli_error($db) . "</p>";
	// }
} catch (exception $e){
	$error = $e->getMessage();
}
// var_dump($_POST);
$query = "SELECT post.ID FROM post JOIN main_topic ON post.MAIN_ID = main_topic.ID";
if ($db->query($query) == false){
	echo "FALSE";
} elseif ($db->query($query) == true) {
	echo "TRUE<br>";
	$result = $db->query($query);
	for ($i=0; $i < $result->num_rows ; $i++){
		echo "<pre>";
		var_dump($result->fetch_row());
		echo "</pre>";
}
}


?>

</body>
</html>