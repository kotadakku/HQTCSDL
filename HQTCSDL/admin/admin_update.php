<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>Sửa thông tin sản phẩm</title>
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
    <link rel="stylesheet" type="text/css" href="./css/site-examples.css">
    <link rel="stylesheet" type="text/css" href="./css/bootstrap.css">
    <script type="text/javascript" language="javascript" src="./js/jquery-3.3.1.js.download"></script>
    <script type="text/javascript" language="javascript" src="./js/jquery.dataTables.min.js.download"></script>
    <script type="text/javascript" language="javascript" src="./js/dataTables.bootstrap4.min.js.download"></script>
   
    <script type="text/javascript" class="init">
    $(document).ready(function() {
        $('#example').DataTable();
    });
    </script>
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
</head>

<body class="wide comments example dt-example-bootstrap4">
    <a name="top" id="top"></a>
    <div class="fw-background">
        <div></div>
    </div>
    <div class="fw-container">  
    <?php include('admin_header.php') ?>  
        <div class="fw-body">
            <div class="content">
                <div id="example_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">
                        <div class="col-sm-12">
                        	<?php

$MaH = $_REQUEST['pid'];
$query = "SELECT * FROM Hang WHERE MaH='$MaH'";
$result= sqlsrv_query($conn, $query);
$rows = sqlsrv_fetch_array($result);
?>

                            <form method="post" action="admin_updatepro.php" enctype="multipart/form-data">
            	<input type="hidden" name="pid" value="<?php echo $rows['MaH']; ?>">

					<div class="col-md-5 zoom-grid">
						<div class="flexslider">
							<ul class="slides">
								<li data-thumb="<?php echo $rows['image']; ?>">
									<div class="thumb-image"> <img src="<?php echo $rows['HinhAnh']; ?>" data-imagezoom="true" class="img-responsive" alt="<?php echo $rows['MaH']; ?>" /> </div>
								</li>
							</ul>
						</div>
            			<div>
            				<span>Hình ảnh<label>*</label></span>
            				<input type="file" name="file" required="required" multiple="multiple">
            			</div>
					</div>
          			<br>
					<div class="col-md-7 dress-info">
            			<div class="span span2">
              				<p class="left">Tên sản phẩm </p>
              				<input type="text" name="name" value="<?php echo $rows['TenH']; ?>" required="required">
            				<div class="clearfix"></div>
            			</div>
            			<br>
            			<div>
              				<div class="clearfix"></div>
            				<p class="left">Giá</p>
            				<input type="text" name="price" value="<?php echo $rows['Gia']; ?>">
            			</div>
						
						
						<div class="span span1">
							<p class="left">Số lượng</p>
							<input type="text" name="quantity" value="<?php echo $rows['Gia']; ?>">
							<div class="clearfix"></div>
						</div>
						<div class="span span2">
							<p class="left">Loại hàng</p>
    						<?php 
				  	$query = "SELECT * From LOAIHANG";
				  	$result = sqlsrv_query($conn, $query);
				  	while($rows = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)):
				  	 ?>
				  	<label class="radio-inline"><input type="radio" name="category" checked="checked" value="<?php echo $rows['MaL']; ?>"> <?php echo $rows['TenL'] ?></label>
				  <?php endwhile ?>
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
        					<li class="test-class active"><a class="deco-none misc-class" href="#how-to">Thông tin về sản phẩm</a></li>
      					</ul>
      					<div class="tab-content responsive hidden-xs hidden-sm">
        					<div class="tab-pane active" id="how-to">
        						<?php

$MaH = $_REQUEST['pid'];
$query = "SELECT * FROM Hang WHERE MaH='$MaH'";
$result= sqlsrv_query($conn, $query);
$rows = sqlsrv_fetch_array($result);
?>
          						<span>Chi tiết sản phẩm<label></label></span>
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
                    <div class="row">
                    </div>
                </div>
            </div>
        </div>
    </div>    
</body>
</html>