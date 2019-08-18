<?php
	include_once('check_login.php');
	require_once('conn.php');
	require_once('utils.php');

	if (
		isset($_POST['content']) &&
		!empty($_POST['content'])
		) {
			$content = $_POST['content'];
			$parent_id = $_POST['parent_id'];
			
			$sql = "INSERT INTO prince811009_comments(username, content, parent_id) VALUES ('$user', '$content', $parent_id)";
			if ($conn->query($sql)) {
				//server redirect
				header('Location: ./index.php');
			} else {
				// client redirect
				printMessage($conn->error, './index.php');
			}

		} else {
			printMessage('請輸入內容', './index.php');
	}
?>