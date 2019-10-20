
<!DOCTYPE html>
<html>
<head>
<title>Đăng nhập</title>
<link href="../css/bootstrap.css" rel='stylesheet' type='text/css' />
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="../js/jquery.min.js"></script>
<!-- Custom Theme files -->
<link href="../css/style.css" rel="stylesheet" type="text/css" media="all" />
<!-- Custom Theme files -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Eshop Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template,
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<!--webfont-->
<!-- for bootstrap working -->
	<script type="text/javascript" src="../js/bootstrap-3.1.1.min.js"></script>
<!-- //for bootstrap working -->
<!-- cart -->
	<script src="../js/simpleCart.min.js"> </script>
<!-- cart -->
<link rel="stylesheet" href="../css/flexslider.css" type="text/css" media="screen" />
</head>
<body>
	<!-- header-section-starts -->
	<?php include('header.php'); ?>
	<!-- content-section-starts -->
	<div class="content">
	<div class="container">
		<div class="login-page">
		    <div class="dreamcrub">
            	<div class="clearfix"></div>
		   	</div>
		   	<div class="account_grid">
		   		<div class="col-md-6 login-left wow fadeInLeft" data-wow-delay="0.4s">
		  	 		<h2>Tạo tào khoản mới</h2>
			 		<p>Tạo tạo tài khoản và bạn có thể mua sắm!</p>
			 		<a class="acount-btn" href="register.php">Tạo tài khoản mới</a>
		   		</div>
		   		<div class="col-md-6 login-right wow fadeInRight" data-wow-delay="0.4s">
		  			<h3>ĐĂNG NHẬP</h3>
					<p>Nếu bạn đã có tào khoản</p>
					<form method="post" action="login.php">
				  		<div>
							<span>Email<label>*</label></span>
							<input type="text" name="email" required="required">
				  		</div>
				  		<div>
							<span>Mật Khẩu<label>*</label></span>
							<input type="password" name="password" required="required">
				  		</div>
				  			<input type="submit" value="Đăng nhập">
			    	</form>
		   		</div>
		   		<div class="clearfix"> </div>
		 	</div>
		</div>
	</div>
	<?php include('footer.php') ?>

</body>
</html>