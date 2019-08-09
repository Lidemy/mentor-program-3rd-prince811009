<?php
	include_once('./check_login.php');
	include_once('./conn.php');
	include_once('./utils.php');
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
	<?php
		$page = 1;
		if (isset($_GET['page']) && !empty($_GET['page'])) {
			$page = (int) $_GET['page'];
		}
		$size = 20;
		$start = $size * ($page - 1);
		$sql = "SELECT c.id, c.content, c.created_at, c.username, u.nickname FROM prince811009_comments as c LEFT JOIN prince811009_users as u ON c.username = u.username WHERE c.parent_id = 0 ORDER BY c.id DESC LIMIT $start, $size";
		$result = $conn->query($sql);	
	?>
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
			<input type="hidden" value="0" name="parent_id" />
			<div class="form__row">
				內容：
				<div>
					<textarea name="content" rows="10" cols="90"></textarea>
				</div>			
			</div>
			<?php if ($user) { ?>
				<input type="submit" />
			<?php } else { ?>
				<div>請先註冊或登入</div>
			<?php } ?>
		</form>
	</div>
	<?php
		$count_sql = "SELECT count(*) as count FROM prince811009_comments where parent_id=0";
		$count_result = $conn->query($count_sql);	
		if ($count_result && $count_result->num_rows > 0) {
			$count = $count_result->fetch_assoc()['count'];
			$total_page = ceil($count / $size);
			echo '<div class="page">';
			for($i=1; $i<=$total_page; $i++) {
				echo "<a href='./index.php?page=$i'>$i</a>";
			}
			echo '</div>';
		}
	
	?>

	<div class="comments">
		<?php
			if ($result) {
				while($row = $result->fetch_assoc()) {
					?>
						<div class="comment">
							<div class="comment__author">作者：<?= $row['nickname'] ?></div>
							<div class="comment__content"><?= $row['content'] ?></div>
							<div class="comment__time">發言時間：<?= $row['created_at'] ?></div>
													
								<?php
									if ($user === $row['username']) {
										echo renderEditBtn($row['id']);
										echo renderDeleteBtn($row['id']);
									};
								?>
							
							<div class="sub-comments">
								<?php
									$parent_id = $row['id'];
									$sql_sub = "SELECT c.id, c.content, c.created_at, c.username, u.nickname FROM prince811009_comments as c LEFT JOIN prince811009_users as u ON c.username = u.username WHERE c.parent_id = $parent_id ORDER BY c.id DESC";
									$result_sub = $conn->query($sql_sub);
									if ($result_sub) {
										while($row_sub = $result_sub->fetch_assoc()) {
								?>
									<div class="sub-comment">
										<div class="sub-comment__author">作者：<?= $row_sub['nickname'] ?></div>
										<div class="sub-comment__content"><?= $row_sub['content'] ?></div>
										<div class="sub-comment__time">發言時間：<?= $row_sub['created_at'] ?></div>
										<?php
											if ($user === $row_sub['username']) {
												echo renderEditBtn($row_sub['id']);
												echo renderDeleteBtn($row_sub['id']);
											};
										?>
									</div>
								<?php
										}
									}
								?>
								<div class="add-sub-comment">
									<h3>新增留言</h3>
									<form method="POST" action="./add_comment.php">
									<input type="hidden" value="<?php echo $parent_id; ?>" name="parent_id" />
										<div class="form__row">
											內容：
											<div>
												<textarea name="content" style="margin: 0px; width: 492px; height: 126px;"></textarea>
											</div>			
										</div>
										<?php if ($user) { ?>
											<input type="submit" />
										<?php } else { ?>
											<div>請先註冊或登入</div>
										<?php } ?>
									</form>
								</div>
							</div>	
						</div>
					<?php
				}
			}
		?>
		</div>
	</div>
</body>
</html>