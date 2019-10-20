<!DOCTYPE html>
<html>
<head>
<title>Đăng ký</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />

<link href="../css/bootstrap.css" rel='stylesheet' type='text/css' />
<script src="../js/jquery.min.js"></script>
<link href="../css/style.css" rel="stylesheet" type="text/css" media="all" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/simpleCart.min.js"> </script>
<link rel="stylesheet" href="../css/flexslider.css" type="text/css" media="screen" />
</head>
<body>
	<!-- registration-form -->
	<?php include('header.php') ?>
	<div class="registration-form">
		<div class="container">
			<h2>Tạo tài khoản mới</h2>
			<div class="registration-grids">
				<div class="reg-form">
					<div class="reg">
					 	
					 	<p>Nếu bạn đã có tài khoản <a href="account.php">click vào đây</a></p>
					 	<form method="post" action="register_pro.php">
						<ul>
							<li class="text-info">Tên: </li>
							<li><input type="text" value="" name="name" required="required"></li>
						</ul>
						<ul>
							<li class="text-info">Email: </li>
							<li><input type="text" value="" name="email" required="required"></li>
						</ul>
						<ul>
							<li class="text-info">Mật khẩu: </li>
							<li><input type="password" value="" name="password" required="required"></li>
						</ul>
						<ul>
							<li class="text-info">Số điện thoại:</li>
							<li><input type="text" value="" name="phone" required="required"></li>
						</ul>
						<ul>
							<li class="text-info">Địa chi:</li>
							<li><input type="text" value="" name="diachi" required="required"></li>
						</ul>
						<input type="submit" value="ĐĂNG KÝ" name="submit">
					 	</form>
				 	</div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<?php include('footer.php') ?>
</body>
</html>