<?php
 include 'connection/connection.php';
//include 'redirect.php';
//$paid = 'no';
$MaH = $_REQUEST['pid'];
// $q = "SELECT * FROM products";
$query = "SELECT * FROM view_HANG where MaH='$MaH'";
$result = sqlsrv_query($conn,$query);
$rows3 = sqlsrv_fetch_array($result);
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
	<?php include('header.php') ?>
	<div class="container">
	   <div class="products-page">
			<div class="new-product">
				<div class="col-md-5 zoom-grid">
					<div class="flexslider">
						<ul class="slides">
							<li data-thumb="<?php echo $rows['HinhAnh']; ?>">
								<div class="thumb-image"> <img src="<?php echo $rows3['HinhAnh']; ?>" data-imagezoom="true" class="img-responsive" alt="" /> </div>
							</li>
							<li data-thumb="<?php echo $rows['image2']; ?>">
								<div class="thumb-image"> <img src="<?php echo $rows3['HinhAnh']; ?>" data-imagezoom="true" class="img-responsive" alt="" /> </div>
							</li>
							<li data-thumb="<?php echo $rows['image3']; ?>">
								<div class="thumb-image"> <img src="<?php echo $rows3['HinhAnh']; ?>" data-imagezoom="true" class="img-responsive" alt="" /> </div>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-md-7 dress-info">
					<div class="dress-name">
						<h3><?php echo $rows3['TenH']; ?></h3>
						<span>Giá: <?php echo $rows3['Gia']; ?></span>
						<div class="clearfix"></div>
						<p></p>
					</div>
					<div class="span span1">
						<p class="left">Thể loại</p>
						<p class="right"><?php echo $rows3['TenL']; ?></p>
						<div class="clearfix"></div>
					</div>
					<div class="span span2">
						<p class="left">Số lượng còn lại: </p>
						<p class="right"><?php
            if($rows3['SlCon'] <=0)
            {
              $t = "Out of stock";
              $flag = 1;
            }
            else {
              $t =  $rows3['SlCon'];
              $flag = 0;
            }
            echo $t;
            ?></p>
						<div class="clearfix"></div>
					</div>
          <?php
if($flag == 0 )
{
  echo '<form method="post" action="addedcart.php">
<div class="span span3">
<p class="left">Số lượng mua: </p>
<input type="number" name="quantity" value="1" min="1" max='.$t.'">
<input type="hidden" name="pid" value="'.$rows3['MaH'].'">
<input type="hidden" name="price" value="'.$rows3['Gia'].'">
<input type="hidden" name="net" value="'.$t.'">
    <div class="clearfix"></div>
</div>
<!-- <div class="purchase"> -->
<input type="submit" name="qu" value="Thêm vào giỏ" placeholder="Purchase now" >
<!-- </div> -->
    </form>';
}
           ?>

              		<div class = col-sm-7>

				</div>
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
		 		<p class="tab-text"><?php echo $rows['ChiTiet']; ?></p>
        	</div>
        	<div class="tab-pane" id="features"></div>
      	</div>
		</div>
   </div>
   <!-- content-section-ends -->
	<?php include('footer.php') ?>
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
