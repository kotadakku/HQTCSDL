<?php
include '../connection/connection.php';
 session_start();
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
}
?>
<link rel="stylesheet" href="">
<link href="../css/style.css" rel="stylesheet" type="text/css" media="all" />
<link href="../css/component.css" rel='stylesheet' type='text/css' />
<link rel="stylesheet" href="../css/flexslider.css" type="text/css" media="screen" />
<link rel="stylesheet" type="text/css" href="../css/site-examples.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <script type="text/javascript" language="javascript" src="../js/jquery-3.3.1.js.download"></script>
    <script type="text/javascript" language="javascript" src="../js/jquery.dataTables.min.js.download"></script>
    <script type="text/javascript" language="javascript" src="../js/dataTables.bootstrap4.min.js.download"></script>
    <link rel="stylesheet" type="text/css" href="../css/all.css">
    <link rel="stylesheet" type="text/css" href="../css/fontawesome/css/fontawesome.css">
   
    <script type="text/javascript" class="init">
    $(document).ready(function() {
        $('#example').DataTable();
    });
    </script>
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>

  <script type="text/javascript" src="../js/bootstrap-3.1.1.min.js"></script>
  <script src="../js/simpleCart.min.js"> </script>
<div class="fw-header">
    <div class="text-center admin_page">
        <h2>ADMIN PAGE</h2>
    </div>
    <div class="nav-search">
        <div class="nav-item i-user"><a href="" class="register-action follow-link login"><?php echo $_SESSION['vaitro']; ?></a></div>/
       <div class="nav-item i-user"><a href="../Shop/logout.php" class="register-action follow-link login">Đăng xuất</a></div>
    </div>
</div>
<div class="fw-nav">
    <div class="nav-main">
        <ul>
            <li class="sub-active sub">Quản lý
                <ul>
                    <li class=""><a href="http://localhost/HQTCSDL/Admin/admin_cart.php">Quản lý đơn hàng</a></li>
                    <?php if($_SESSION['vaitro']=='admin' or $_SESSION['vaitro']=='phucvu') 
                  echo  '<li class=""><a href="http://localhost/HQTCSDL/Admin/admin_users.php">Quản lý người dùng</a></li>';
                    ?>
                    <li class=""><a href="http://localhost/HQTCSDL/Admin/admin_products.php">Quản lý sản phẩm</a></li>
                    <?php if($_SESSION['vaitro']=='admin' or $_SESSION['vaitro']=='kho') 
                  echo  '<li class="e"><a href="http://localhost/HQTCSDL/Admin/admin_add.php">Thêm mới sản phẩm</a></li>';
                    ?>
                    
                </ul>
            </li>
            <li class="sub-active sub">Thống kê
                <ul>
                    <li class="">
                        Thống kê doanh thu
                        <ul>
                            <li class=""><a href="http://localhost/HQTCSDL/Statistical/Statistical_money_date.php">Theo thời gian</a></li>
                            <li class=""><a href="http://localhost/HQTCSDL/Statistical/Statistical_money_sectors.php">Loại hàng</a></li>
                            <li class=""><a href="http://localhost/HQTCSDL/Statistical/Statistical_best_users.php">Người mua nhiều</a></li>
                            <li class=""><a href="http://localhost/HQTCSDL/Statistical/Statistical_best_hang.php">Mặt hàng bán nhiều</a></li>
                        </ul>
                    </li>
                    <li class="">
                        Thống kê số lượng mua
                        <ul>
                            <li class=""><a href="http://localhost/HQTCSDL/Statistical/Statistical_amount_date.php">Theo thời gian</a></li>
                            <li class=""><a href="http://localhost/HQTCSDL/Statistical/Statistical_amount_sectors.php">Loại hàng</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="mobile-show">
        <a><i>Show site navigation</i></a>
    </div>
</div>