 <?php
include 'connection/connection.php';
 session_start();

  // if($_SESSION['name']!='admin');
  // {
  // 	header("location: index.php");
  // }

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
	<!-- header-section-starts -->
	<div class="header ">
    <div class="header-top-strip">
      <div class="container">
        <div class="header-top-left">
          <ul>
             <li><a href=""><span class="glyphicon glyphicon-user"> </span><?php //echo $_SESSION['name']; ?></a></li>
              <li><a href="logout.php"><span class="glyphicon glyphicon-reply"> </span>Logout</a></li>
          </ul>
        </div>
        <div class="align-items-center"><center><h4><b class="text-white">ADMIN PAGE</b></h4> </center></div>
      </div>
    </div>
  </div>
	<!-- header-section-ends -->	


	<div class="table-responsive|table-responsive-sm|table-responsive-md|table-responsive-lg|table-responsive-xl">
		<table class="table table-striped|table-dark|table-bordered|table-borderless|table-hover|table-sm">
		  <caption> <center>Danh sách người dùng</center></caption>
		  <thead class="thead-dark|thead-light">
		    <tr>
		      <th scope="col">Mã số</th>
		      <th scope="col">Họ Tên</th>
		      <th scope="col">Email</th>
		      <th scope="col">Số điện thoại</th>
		      <th scope="col">Vài trò</th>
		      <th scope="col">Địa Chỉ</th>
		      <th></th>
		      <th></th>
		    </tr>
		  </thead>
		  <tbody>
		  	<?php
						$query = "SELECT * FROM NGUOIDUNG";
						$result = sqlsrv_query($conn, $query);
						while($rows = sqlsrv_fetch_array($result)) :
						?>
		    <tr>
		      <th scope="row"><?php echo $rows['MAND']; ?></th>
		      <td><?php echo $rows['HoTen']; ?></td>
		      <td><?php echo $rows['Email']; ?></td>
		      <td><?php echo $rows['SDT']; ?></td>
		      <td><?php echo $rows['VaiTro']; ?></td>
		      <td><?php echo $rows['DiaChi']; ?></td>
		      <td><a class="cbp-vm-icon cbp-vm-add item_add" style ="margin-top: 0px !important" href="admin_users_delete.php?cid=<?php echo $rows['MAND'];?>">Xóa người dùng</a></td>
		      <td><a class="cbp-vm-icon cbp-vm-add item_add" style ="margin-top: 0px !important" href="admin_users_update.php?cid=<?php echo $rows['MAND'];?>">Sửa thông tin</a></td>

		    </tr>
		<?php endwhile ?>
		  </tbody>
		</table>
</body>
</html>