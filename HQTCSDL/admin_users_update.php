<?php
include 'connection/connection.php';
 session_start();
 

$MaND = $_REQUEST['cid'];
$query = "SELECT * FROM NGUOIDUNG WHERE MaND='$MaND'";
$result= sqlsrv_query($conn, $query);
$rows = sqlsrv_fetch_array($result);
// $result = $conn->prepare("SELECT * FROM products WHERE pid = :hjhjhjh");
// $result->bindParam(':hjhjhjh', $prod);

// $result->execute();

// $rows = $result->fetch();
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
	<!-- header-section-starts -->
	<div class="header">
    <div class="header-top-strip">
      <div class="container">
        <div class="header-top-left">
          <ul>
            <li><a href=""><span class="glyphicon glyphicon-user"> </span><?php echo $_SESSION['name']; ?></a></li>
                  <li><a href="logout.php"><span class="glyphicon glyphicon-reply"> </span>Logout</a></li>
          </ul>
        </div>
        <div class="clearfix"> </div>
      </div>
    </div>
  </div>
	<!-- header-section-ends -->	
	<!-- content-section-starts -->
	<div class="container">
	   <div class="products-page">
			<div class="products">
			</div>
			<div class="new-product">
          	<form method="post" action="admin_users_updatepro.php" enctype="multipart/form-data">
            	<input type="hidden" name="cid" value="<?php echo $rows['MAND']; ?>">
					<div class="col-md-7 dress-info">
            			<div class="span span2">
              				<p class="left">Họ Tên </p>
              				<input type="text" name="ht" value="<?php echo $rows['HoTen']; ?>" required="required">
            				<div class="clearfix"></div>
            			</div>
            			<br>
            			<div>
              				<div class="clearfix"></div>
            				<p class="left">Email</p>
            				<input type="text" name="email" value="<?php echo $rows['Email']; ?>">
            			</div>
						<div class="span span1">
							<div class="clearfix"></div>
            				<p class="left">Số điện thoại</p>
            				<input type="text" name="sdt" value="<?php echo $rows['SDT']; ?>">
						</div>
						<div class="span span2">
							<p class="left">Mật khẩu</p>
							<input type="password" name="mk" value="<?php echo $rows['MatKhau']; ?>">
							<div class="clearfix"></div>
						</div>
						<div class="span span3">
							<p class="left">Địa Chỉ</p>
							<input type="text" name="dc" value="<?php echo $rows['DiaChi']; ?>">
							<div class="clearfix"></div>
						</div>
						<div class="span span4">
							<p class="left">Vai trò</p>
    						<label class="radio-inline"><input type="radio" name="vt" value="admin">Admin</label>
					      	<label class="radio-inline"><input type="radio" name="vt" value="kho">Nhân viên kho</label>
      						<label class="radio-inline"><input type="radio" name="vt" value="khachhang">Khách hàng</label>
							<div class="clearfix"></div>
						</div>
						<script src="js/imagezoom.js"></script>
						<!-- FlexSlider -->
						<script defer src="js/jquery.flexslider.js"></script>
						<script>
							// Can also be used with $(document).ready()
							$(window).load(function() {
						  	$('.flexslider').flexslider({
							animation: "slide",
							controlNav: "thumbnails"
						  	});
							});
						</script>
						</div>
						<div class="clearfix"></div>
						<div class="reviews-tabs">
      					<input class="inline" type="submit" value="Cập nhật thông tin">
      					</div>
    			</form>
   			</div>
   		</div>
   	</div>
   <!-- content-section-ends -->
 	<script src="js/responsive-tabs.js"></script>
	    <script type="text/javascript">
	      $( '#myTab a' ).click( function ( e ) {
	        e.preventDefault();
	        $( this ).tab( 'show' );
	      } );

	      $( '#moreTabs a' ).click( function ( e ) {
	        e.preventDefault();
	        $( this ).tab( 'show' );
	      } );

	      ( function( $ ) {
	          // Test for making sure event are maintained
	          $( '.js-alert-test' ).click( function () {
	            alert( 'Button Clicked: Event was maintained' );
	          } );
	          fakewaffle.responsiveTabs( [ 'xs', 'sm' ] );
	      } )( jQuery );
    </script>
</body>
</html>
