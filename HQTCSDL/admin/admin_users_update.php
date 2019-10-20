<?php
include '../connection/connection.php';

 

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
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>Sửa người dùng</title>
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
</head>

<body class="wide comments example dt-example-bootstrap4">
    <a name="top" id="top"></a>
    <div class="fw-background">
        <div></div>
    </div>
    <div class="fw-container">  
    <?php include('admin_header.php') ;
     if(isset($_SESSION['vaitro']))
{

   if($_SESSION['vaitro']!='admin' and $_SESSION['vaitro']!='kho' and $_SESSION['vaitro']!='phucvu')
   {
   	header("location: ../Shop/account.php");
   }
}
else
{
	header("location: ../Shop/account.php");
}?>  

        <div class="fw-body">
            <div class="content">
                <div id="example_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">
                        <div class="col-sm-12">
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
            				<input type="text" name="email" <?php if($_SESSION['vaitro']!='admin') echo 'readonly="readonly"' ?> value="<?php echo $rows['Email']; ?>">
            			</div>
						<div class="span span1">
							<div class="clearfix"></div>
            				<p class="left">Số điện thoại</p>
            				<input type="text" name="sdt" value="<?php echo $rows['SDT']; ?>">
						</div>
						<div class="span span2">
							<p class="left">Mật khẩu</p>
							<input type="password" <?php if($_SESSION['vaitro']!='admin') echo 'readonly="readonly"' ?> name="mk" value="<?php echo $rows['MatKhau']; ?>">
							<div class="clearfix"></div>
						</div>
						<div class="span span3">
							<p class="left">Địa Chỉ</p>
							<input type="text" name="dc" value="<?php echo $rows['DiaChi']; ?>">
							<div class="clearfix"></div>
						</div>
						<?php if($_SESSION['vaitro']=='admin')
						{ ?>
						<div class="span span4">
							<p class="left">Vai trò</p><br>
    						<label class="radio-inline"><input type="radio" name="vt" value="admin">Admin</label>
					      	<label class="radio-inline"><input type="radio" name="vt" value="kho">Nhân viên kho</label>
      						<label class="radio-inline"><input type="radio" checked="checked" name="vt" value="khachhang">Khách hàng</label>
      						<label class="radio-inline"><input type="radio" name="vt" value="phucvu">Nhân viên phục vụ</label>
							<div class="clearfix"></div>
						</div>
					<?php } ?>
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
                    <div class="row">
                    </div>
                </div>
            </div>
        </div>
    </div>    
</body>
</html>
