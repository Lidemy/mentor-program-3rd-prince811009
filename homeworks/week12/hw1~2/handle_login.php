<?php
	session_start();
	require_once('conn.php');
	require_once('utils.php');
	
	if (
		isset($_POST['username']) &&
		isset($_POST['password']) &&
		!empty($_POST['username']) &&
		!empty($_POST['password'])
		) {
			$username = $_POST['username'];
			$password = $_POST['password'];

			$stmt = $conn->prepare("SELECT password from prince811009_users where username=?");
			$stmt->bind_param("s", $username);
			$result = $stmt->execute();
			if (!$result) {
				printMessage($conn->error, './login.php');
				exit();
			}
			
			$stmt->store_result();
			if ($stmt->num_rows <= 0) {
				printMessage('帳號或密碼錯誤', './login.php');
				exit();
			}

			$stmt->bind_result($hash_password);
			$stmt->fetch();
			if (password_verify($password, $hash_password)) {
				$_SESSION['username'] = $username;
				printMessage('登入成功', './index.php');
			} else {
				printMessage('帳號或密碼錯誤', './login.php');
				exit();
			}
		} else {
		printMessage('帳號或密碼錯誤', './login.php');
	}
?>