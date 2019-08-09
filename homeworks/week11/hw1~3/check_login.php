<?php
	include_once('./conn.php');
	include_once('./utils.php');
	
	if (isset($_COOKIE['token']) && !empty($_COOKIE['token'])) {
		$token = $_COOKIE['token'];
		$sql = "SELECT * from prince811009_certificates where token ='$token'";
		$result = $conn->query($sql);
		if (!$result || $result->num_rows <= 0) {
			$user = null;
		} else {
		  $row = $result->fetch_assoc();
		  $user = $row['username'];
		}
	} else {
		$user = null;
	}
?>