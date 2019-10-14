<?php
include 'connection/connection.php';
 session_start();
 

$MaH = $_REQUEST['pid'];
$query = "SELECT * FROM Hang WHERE MaH='$MaH'";
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
          	<form method="post" action="admin_updatepro.php" enctype="multipart/form-data">
            	<input type="hidden" name="pid" value="<?php echo $rows['MaH']; ?>">
					<div class="col-md-5 zoom-grid">
						<div class="flexslider">
							<ul class="slides">
								<li data-thumb="<?php echo $rows['image']; ?>">
									<div class="thumb-image"> <img src="<?php echo $rows['HinhAnh']; ?>" data-imagezoom="true" class="img-responsive" alt="" /> </div>
								</li>
							</ul>
						</div>
            			<div>
            				<span>Product Images<label>*</label></span>
            				<input type="file" name="file" required="required" multiple="multiple">
            			</div>
					</div>
          			<br>
					<div class="col-md-7 dress-info">
            			<div class="span span2">
              				<p class="left">Product name </p>
              				<input type="text" name="name" value="<?php echo $rows['TenH']; ?>" required="required">
            				<div class="clearfix"></div>
            			</div>
            			<br>
            			<div>
              				<div class="clearfix"></div>
            				<p class="left">Product price</p>
            				<input type="text" name="price" value="<?php echo $rows['Gia']; ?>">
            			</div>
						<div class="span span1">
							<p class="left">Category</p>
    						<label class="radio-inline"><input type="radio" name="category" value="books">Sách</label>
					      	<label class="radio-inline"><input type="radio" name="category" value="electronics">Electronics</label>
      						<label class="radio-inline"><input type="radio" name="category" value="clothes">Quần áo</label>
							<div class="clearfix"></div>
						</div>
						<div class="span span2">
							<p class="left">Year/model</p>
							<input type="text" name="year" value="<?php echo $rows['year']; ?>">
							<div class="clearfix"></div>
						</div>
						<div class="span span3">
							<p class="left">Quantity</p>
							<input type="text" name="quantity" value="<?php echo $rows['SlCon']; ?>">
							<div class="clearfix"></div>
						</div>
						<div class="purchase">
							<a href="admin_products?category = <?php echo $rows['TheLoai']; ?>"></a>
							<div class="social-icons">
								<ul>
									<li><a class="facebook1" href="#"></a></li>
									<li><a class="twitter1" href="#"></a></li>
									<li><a class="googleplus1" href="#"></a></li>
								</ul>
							</div>
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
      					<!-- Main component for a primary marketing message or call to action -->
     	 				<ul class="nav nav-tabs responsive hidden-xs hidden-sm" id="myTab">
        					<li class="test-class active"><a class="deco-none misc-class" href="#how-to">About the product</a></li>
      					</ul>
      					<div class="tab-content responsive hidden-xs hidden-sm">
        					<div class="tab-pane active" id="how-to">
          						<span>Product details (if any)<label></label></span>
          						<br>
          						<textarea type="text" name="detail"><?php echo $rows['ChiTiet']; ?></textarea>
         						
        					</div>
        					<div class="tab-pane" id="features"></div>
      					</div>
      					<br>
      					<input class="inline" type="submit" value="Cập nhật thông tin">
      					</div>
    			</form>
   			</div>
   		</div>
   	</div>
   <!-- content-section-ends -->
   <div class="footer">
		<div class="container">
		 	<div class="footer_top">
				<div class="span_of_4">
					<div class="col-md-3 span1_of_4">
						<h4>Shop</h4>
						<ul class="f_nav">
							<li><a href="products.php?category=clothing">Clothing</a></li>
							<li><a href="products.php?category=books">Books</a></li>
							<li><a href="products.php?category=electronics">Electronics</a></li>
						</ul>
					</div>
					<div class="col-md-3 span1_of_4">
						<h4>help</h4>
						<ul class="f_nav">
							<li><a href="contact.php">Contact Info</a></li>
							<li><a href="terms.php">Terms and Conditons</a></li>
						</ul>
					</div>
					<div class="col-md-3 span1_of_4">
						<h4>account</h4>
						<ul class="f_nav">
							<li><a href="account.html">login</a></li>
							<li><a href="register.html">create an account</a></li>
							<li><a href="#">create wishlist</a></li>
							<li><a href="checkout.html">my shopping bag</a></li>
						</ul>
					</div>
					<div class="col-md-3 span1_of_4">
						<h4>Follow us on</h4>
						<ul class="f_nav">
							<li><a href="contact.php">Facebook</a></li>
							<li><a href="contact.php">Twitter</a></li>
							<li><a href="contact.php">Instagram</a></li>
							<li><a href="contact.php">Pinterest</a></li>
						</ul>
					</div>
					<div class="clearfix"></div>
				</div>
		  </div>
		</div>
	</div>
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
