<?php
 include 'connection/connection.php';
 // include 'redirect.php';
 $paid = "1";
?>
<!DOCTYPE html>
<html>
<head>
<title>Shop</title>
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
	<?php include('header.php'); 
	 if(isset($_SESSION['name']))
    { ?>

	<div class="cart-items">
		<div class="container">
			<div class="dreamcrub">
                <div class="clearfix"></div>
			</div>
         	<?php
// $id = $_SESSION['id'];
// $query = "SELECT * from cart inner join products on cart.pid= products.pid inner join customers on customers.customerid=cart.customerid WHERE customers.customerid = '$id' and cart.paid != '$paid'";
//          	$result = sqlsrv_query($conn,$query);
// 			// $res = sqlsrv_fetch_array($result);
          	?>
			<h2>Giỏ hàng của bạn</h2>
			<script>$(document).ready(function(c) {
			$('.close3').on('click', function(c){
					$('.cart-header3').fadeOut('slow', function(c){
				$('.cart-header3').remove();
			});
			});
			});
			</script>
			<?php
			
			$email = $_SESSION['email'];
			$query2 = "SELECT * from NGUOIDUNG where email='$email'";
			$result2= sqlsrv_query($conn, $query2);
			while($rows2 = sqlsrv_fetch_array($result2, SQLSRV_FETCH_ASSOC)){
			  $MAND =$rows2['MAND'];
			}
			$query="SELECT * from view_DS_DONHANG where MaND='$MAND'";
			  $result = sqlsrv_query($conn,$query);
			 while($rows1 = sqlsrv_fetch_array($result)) :
			?>
			<div  class="cart-header3">
          		<a href="deletecart.php?cid=<?php echo $rows1['MAND']; ?>&pid=<?php echo $rows1['MaH']; ?>&quantity=<?php echo $rows1['SLMua']; ?>">
          			<button style="float:right; margin-top:30px;margin-right:20px;"type="button" class="btn btn-danger right">Xóa sản phẩm</button></a>
				<div class="cart-sec simpleCart_shelfItem">
					<div  class="cart-item cyc">
						<img   src="<?php echo $rows1['HinhAnh']; ?>" class="img-responsive" alt="<?php echo $rows1['TenH']; ?>">
					</div>
					<div class="cart-item-info">
						<h3><a href="#"> <?php echo $rows1['TenH']; ?></a><span></span></h3>
						<ul class="qty">
							<li><p>Số lượng:<?php echo $rows1['SLMua']; ?></p></li>
							<li><p>Giá:<?php echo $rows1['Gia']; ?> VND</p></li>
              				<li><p>Tổng tiền:<?php echo $rows1['TongTien']; ?> VND</p></li>
						</ul>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
			<?php
				  endwhile;

			?>
	        <?php
			$email = $_SESSION['email'];
			$query2 = "SELECT * from NGUOIDUNG where email='$email'";
			$result2= sqlsrv_query($conn, $query2);
			while($rows2 = sqlsrv_fetch_array($result2, SQLSRV_FETCH_ASSOC)){
			  $MAND =$rows2['MAND'];
			}
			$tsql_callSP = "{call sp_TongTien_DonHang( ?, ? )}";
			$Tong = 0.0;  
			$params = array(   
			                 array($MAND, SQLSRV_PARAM_IN),  
			                 array(&$Tong, SQLSRV_PARAM_OUT)  
			               );  
			  
			$stmt3 = sqlsrv_query( $conn, $tsql_callSP, $params);  
	         echo '<div class="cart-item-info">
						<ul class="qty">
							<li><p>Số tiền cần thanh toán là: </p></li>
              				<li><p>'.$Tong.'  VND</p> </li>
						</ul>
					</div>';

  			?>
         	<a href="pay.php?cid=<?php echo $MAND; ?>"><button style="float:right; margin-top:30px;margin-right:20px;"type="button" class="btn btn-success">Thanh toán</button></a>
		</div>
	</div>
<?php 
}
else{
	echo '<center>Để thực hiện chức năng này bạn cần đăng nhập!<br> Bạn cần đăng nhập!<br>
	<a href="account.html"><button type="button" class="btn btn-success">Đăng nhập</button></a> <br>
	<a href="account.html"><button type="button" class="btn btn-link">Tạo tài khoản</button></a></center>
         	';
}
 ?>
	
	<?php include('footer.php') ?>
</body>
</html>
