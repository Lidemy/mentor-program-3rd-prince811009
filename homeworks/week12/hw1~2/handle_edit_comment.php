<?php
	include_once('check_login.php');
	require_once('conn.php');
	require_once('utils.php');

	if (
		isset($_POST['content']) &&
		!empty($_POST['content'])
		) {
			$content = $_POST['content'];
			$id = $_POST['id'];
			
			$sql = "UPDATE prince811009_comments SET content = '$content' WHERE id = $id AND username = '$username'";
			if ($conn->query($sql)) {
				header('Location: ./index.php');
			} else {
				printMessage($conn->error, $_SERVER["HTTP_REFERER"]);
			}
		} else {
			printMessage('請輸入內容', $_SERVER["HTTP_REFERER"]);
	}
?>