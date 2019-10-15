<?php
include 'connection/connection.php';
session_start();
   if(isset($_SESSION['vaitro']))
{

   if($_SESSION['vaitro']!='admin' and $_SESSION['vaitro']!='kho' and $_SESSION['vaitro']!='phucvu')
   {
   	header("location: account.html");
   }
}
else
{
	header("location: account.html");
}

?>
<!DOCTYPE html>
<html>
<head>
<title>Eshop</title>
<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="js/jquery.min.js"></script>
<!-- Custom Theme files -->
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<!-- Custom Theme files -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Eshop Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template,
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<!--webfont-->
<!-- for bootstrap working -->
	<script type="text/javascript" src="js/bootstrap-3.1.1.min.js"></script>
<!-- //for bootstrap working -->
<!-- cart -->
	<script src="js/simpleCart.min.js"> </script>
<!-- cart -->
<link rel="stylesheet" href="css/flexslider.css" type="text/css" media="screen" />
</head>
<body>
	<!-- header-section-starts -->
	<div class="header">
    <div class="header-top-strip">
      <div class="container">
        <div class="header-top-left">
          <ul>
            <li><a href=""><span class="glyphicon glyphicon-user"> </span><?php echo $_SESSION['vaitro']; ?></a></li>
                  <li><a href="logout.php"><span class="glyphicon glyphicon-reply"> </span>Logout</a></li>
          </ul>
        </div>
        <div class="clearfix"> </div>
      </div>
    </div>
  </div>
	<!-- content-section-starts -->
	<div class="content">
	<div class="container">
		<div class="login-page">
		   	<div class="col-md-6 login-right wow fadeInRight" data-wow-delay="0.4s">
		  		<h3>Thêm sản phẩm mới</h3>
				<form method="post" action="admin_addpro.php" enctype="multipart/form-data">
				  	<div>
						<span>Tên sản phẩm<label>*</label></span>
						<input type="text" name="name" required="required">
				  	</div>
            		<div>
            			<span>Hình ảnh<label>*</label></span>
            			<input type="file" name="file" multiple="multiple" required="required">
            		</div>
				  	<div>
						<span>Giá<label>*</label></span>
						<input type="text" name="price" required="required">
				  	</div>
					<br>
				  	<span>Loại sản phẩm</span>
				  	<?php 
				  	$query = "SELECT * From LOAIHANG";
				  	$result = sqlsrv_query($conn, $query);
				  	while($rows = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)):
				  	 ?>
				  	<label class="radio-inline"><input type="radio" name="category" value="<?php echo $rows['MaL']; ?>"> <?php echo $rows['TenL'] ?></label>
				  <?php endwhile ?>
    				<br><br>

					<span>Chi tiết sản phẩm<label></label></span>
					<input type="text" name="detail">
					<br><br>
          			<br>
          			<div>
          				<span>Số lượng<label>*</label></span>
          				<input type="text" name="quantity" required="required">
          			</div>
          			<br>
					<input type="submit" value="ADD">
				</form>
		   	</div>
			<div class="clearfix"> </div>
		</div>
	</div>
	</div>
</body>
</html>
