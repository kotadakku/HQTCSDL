
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
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
	<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="js/jquery.min.js"></script>
<!-- Custom Theme files -->
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<link href="css/component.css" rel='stylesheet' type='text/css' />
<!-- Custom Theme files -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
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
	<div class="header ">
    <div class="header-top-strip">
      <div class="container">
        <div class="header-top-left">
          <ul>
             <li><a href=""><span class="glyphicon glyphicon-user"> </span><?php echo $_SESSION['vaitro']; ?></a></li>
              <li><a href="logout.php"><span class="glyphicon glyphicon-reply"> </span>Logout</a></li>
          </ul>
        </div>
        <div class="align-items-center"><center><h4><b class="text-white">ADMIN PAGE</b></h4> </center></div>
      </div>
    </div>
  </div>
  <div class="tab-content">
  	<a href="admin_products.php">Quản lý sản phẩm</a><br>
  	<?php  if($_SESSION['vaitro']=='kho' or $_SESSION['vaitro']=='admin') {
		?>
	<a href="admin_add.php">Thêm mới sản phẩm</a><br>
<?php } ?>
	<?php  if($_SESSION['vaitro']=='phucvu' or $_SESSION['vaitro']=='admin') {
		?>
	<a href="admin_users.php">Quản lý người dùng</a>
<?php }?>
<br>
<?php  if($_SESSION['vaitro']=='admin') {
		?>
	<a href="admin_users.php">Thống kê</a>
<?php }?>

  </div>
</body>
</html>