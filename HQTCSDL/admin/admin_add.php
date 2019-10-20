<?php
include '../connection/connection.php';
?>
<!DOCTYPE html>
<html>
<head>
<title>Thêm sản phẩm</title>
<link rel="stylesheet" href="">
<link href="../css/style.css" rel="stylesheet" type="text/css" media="all" />
<link href="../css/component.css" rel='stylesheet' type='text/css' />
<link rel="stylesheet" href="../css/flexslider.css" type="text/css" media="screen" />
<link rel="stylesheet" type="text/css" href="../css/site-examples.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <script type="text/javascript" language="javascript" src="../js/jquery-3.3.1.js.download"></script>
    <script type="text/javascript" language="javascript" src="../js/jquery.dataTables.min.js.download"></script>
    <script type="text/javascript" language="javascript" src="../js/dataTables.bootstrap4.min.js.download"></script>
   
    <script type="text/javascript" class="init">
    $(document).ready(function() {
        $('#example').DataTable();
    });
    </script>
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>

  <script type="text/javascript" src="../js/bootstrap-3.1.1.min.js"></script>
  <script src="../js/simpleCart.min.js"> </script>


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
				  	<label class="radio-inline"><input type="radio" checked="checked" name="category" value="<?php echo $rows['MaL']; ?>"> <?php echo $rows['TenL'] ?></label>
				  <?php endwhile ?>
    				<br><br>

					<div class="tab-content responsive hidden-xs hidden-sm">
        					<div class="tab-pane active" id="how-to">
          						<span>Chi tiết sản phẩm<label></label></span>
          						<br>
          						<textarea type="text" name="detail"><?php echo $rows['ChiTiet']; ?></textarea>
         						
        					</div>
        					<div class="tab-pane" id="features"></div>
      					</div>
					<br><br>
          			<br>
          			<div>
          				<span>Số lượng<label>*</label></span>
          				<input type="text" name="quantity" required="required">
          			</div>
          			<br>
					<input type="submit" value="Thêm">
				</form>
		   	</div>
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
