<?php
	include_once('./check_login.php');
	include_once('./conn.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Home</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<?php include_once('./navbar.php') ?>
	<div class="container">
		<?php
			if ($user) {
				echo '<h1>Hello, ' . $user . '</h1>';
			} else {
				echo 'Please login or register';
			}
		?>

	<div class="form-wrapper">
		<p>「本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼」</p>
		<h1>來留言吧~</h1>
		<form class="form" method="POST" action="./add_comment.php">
			<div class="form__row">
				內容：
				<div>
					<textarea name="content" rows="10" cols="80"></textarea>
				</div>			
			</div>
			<?php if ($user) { ?>
				<input type="submit" />
			<?php } else { ?>
				<div>請先註冊或登入</div>
			<?php } ?>
		</form>
	</div>
	<div class="comments">
		<?php
			$sql = "SELECT c.content, c.created_at, u.nickname FROM prince811009_comments as c LEFT JOIN prince811009_users as u ON c.username = u.username ORDER BY c.id DESC";
			$result = $conn->query($sql);
			
			if ($result) {
				while($row = $result->fetch_assoc()) {
					?>
						<div class="comment">
							<div class="comment__author">作者：<?= $row['nickname'] ?></div>
							<div class="comment__content"><?= $row['content'] ?></div>
							<div class="comment__time">發言時間：<?= $row['created_at'] ?></div>
						</div>
					<?php
				}
			}
		?>
		</div>
	</div>
</body>
</html>