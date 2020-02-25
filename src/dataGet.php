<?php

header("Access-Control-Allow-Origin: *");

include('dbconnect.php');

$totallives = $_POST["TOTALlives"];

$sql = "UPDATE avoBigData SET lives = lives + '$totallives' WHERE id = 1";

if(!mysqli_query($conn, $sql)){
	echo 'query error: ' . mysqli_error($conn);
}
/*
$totalgames = $_POST["TOTALgames"];

$sql = "UPDATE avoBigData SET games = games + '$totalgames' WHERE id = 1";

if(!mysqli_query($conn, $sql)){
	echo 'query error: ' . mysqli_error($conn);
}

$totalshots = $_POST["TOTALshots"];

$sql = "UPDATE avoBigData SET shots = shots + '$totalshots' WHERE id = 1";

if(!mysqli_query($conn, $sql)){
	echo 'query error: ' . mysqli_error($conn);
}

$totalpowerups = $_POST["TOTALpowerups"];

$sql = "UPDATE avoBigData SET powerups = powerups + '$totalpowerups' WHERE id = 1";

if(!mysqli_query($conn, $sql)){
	echo 'query error: ' . mysqli_error($conn);
}

$totallevels = $_POST["TOTALlevels"];

$sql = "UPDATE avoBigData SET levels = levels + '$totallevels' WHERE id = 1";

if(!mysqli_query($conn, $sql)){
	echo 'query error: ' . mysqli_error($conn);
}

$totalscore = $_POST["TOTALscore"];

$sql = "UPDATE avoBigData SET score = score + '$totalscore' WHERE id = 1";

if(!mysqli_query($conn, $sql)){
	echo 'query error: ' . mysqli_error($conn);
}


$totalcoins = $_POST["TOTALcoins"];

$sql = "UPDATE avoBigData SET coins = coins + '$totalcoins' WHERE id = 1";

if(!mysqli_query($conn, $sql)){
	echo 'query error: ' . mysqli_error($conn);
}


$totalkills = $_POST["TOTALkills"];

$sql = "UPDATE avoBigData SET kills = kills + '$totalkills' WHERE id = 1";

if(!mysqli_query($conn, $sql)){
	echo 'query error: ' . mysqli_error($conn);
}


$totalbosses = $_POST["TOTALbosses"];

$sql = "UPDATE avoBigData SET bosses = bosses + '$totalbosses' WHERE id = 1";

if(!mysqli_query($conn, $sql)){
	echo 'query error: ' . mysqli_error($conn);
}
*/
?>