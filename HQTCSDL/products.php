<?php
include 'connection/connection.php';
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
	<?php include('header.php') ?>
		<!-- content-section-starts -->
		<form action="products.php" method="get" accept-charset="utf-8">
		</form>
	<div class="container">
	   <div class="products-page">
			<div class="new-product">
				<div class="new-product-top">
					<div class="clearfix"></div>
			    <div id="cbp-vm" class="cbp-vm-switcher cbp-vm-view-grid">
				<div class="cbp-vm-options">
					<a href="#" class="cbp-vm-icon cbp-vm-grid cbp-vm-selected" data-view="cbp-vm-view-grid" title="grid">Grid View</a>
					<a href="#" class="cbp-vm-icon cbp-vm-list" data-view="cbp-vm-view-list" title="list">List View</a>
				</div>

				<div class="clearfix"></div>
				<?php
						$query= "SELECT MaL, TenL FROM view_HANG GROUP BY MaL,TenL";
						$result= @sqlsrv_query($conn,$query);

						 while($rows1 = @sqlsrv_fetch_array($result,SQLSRV_FETCH_ASSOC)) {
						 	$maloai = $rows1['MaL'];
						 	$tenloai= $rows1['TenL'];

					?>


			   <label for="" name=""><?php echo $tenloai; ?></label>
				<ul>
					<?php
						$query1= "SELECT * FROM view_HANG where MaL='$maloai'";
						$result1= @sqlsrv_query($conn,$query1);

						 while($rows = @sqlsrv_fetch_array($result1,SQLSRV_FETCH_ASSOC)) {
					?>

					<li>
						<a class="cbp-vm-image" href="single.php?pid=<?php echo $rows['MaH']; ?>">
						<div class="simpleCart_shelfItem">
							<div class="view view-first">
					   			<div class="inner_content clearfix">
									<div class="product_image">
										<img style="height:200px;" src="<?php echo $rows['HinhAnh']; ?>" class="img-responsive" alt="<?php echo $rows['TenH']; ?>"/>
										<div class="mask">
			                       			<div class="info">Quick View</div>
					                  	</div>
										<div class="product_container">
									   		<div class="cart-left">
										 		<p class="title"><?php echo $rows['TenH']; ?></p>
									   		</div>
									   		<div class="pricey"><span class="item_price">$<?php echo $rows['Gia']; ?></span></div>
									   		<div class="clearfix"></div>
								     	</div>
								  	</div>
			                    </div>
		                    </div>
		                </div>
						</a>
						<div class="cbp-vm-details"></div>
						<a class="cbp-vm-icon cbp-vm-add item_add" href="addcart.php?pid=<?php echo $rows['MaH']; ?>">Chi tiết</a>
					</li>
					<?php
						 };
					?>
				</ul>
				<?php } ?>



				</div>
				<script src="js/cbpViewModeSwitch.js" type="text/javascript"></script>
                <script src="js/classie.js" type="text/javascript"></script>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="clearfix"></div>
   	</div>
   
		<!-- content-section-ends-here -->
	<?php include('footer.php') ?>
</body>
</html>
