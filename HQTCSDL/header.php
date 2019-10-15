<?php

    session_start();
    include_once 'connection/connection.php';
    $q = "SELECT * from HANG";
    $result= sqlsrv_query($conn,$q);
    $rows= sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);    
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
    <div class="header">
        <div class="header-top-strip">
            <div class="container">
                <div class="header-top-left">
                    <ul>
                        <?php if(isset($_SESSION['name']))
                                {
                                    echo '<li><a href=""><span class="glyphicon glyphicon-user"></span> '.$_SESSION['name'].'
                        
                        </a></li>
                        <li><a href="logout.php"><span class="glyphicon glyphicon-reply"> </span>Đăng xuất</a></li>'; 
                                }
                                else
                                {
                                    echo '<li><a href="account.html"><span class="glyphicon glyphicon-user"></span>Đăng nhập
                        
                        </a></li>
                        <li><a href="register.html"><span class="glyphicon glyphicon-reply"> </span>Tạo tài khoản</a></li>'; 
                                }
                                ?>
                    </ul>
                </div>
                
                <div class="clearfix"> </div>
            </div>
        </div>
    </div>
    <!-- header-section-ends -->
    <div class="banner-top">
        <div class="container">
            <nav class="navbar navbar-default" role="navigation">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <div class="logo">
                        <h1><a href="home.php">SHOPPINg</a></h1>
                    </div>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li><a href="index.php">Trang chủ</a></li>
                        <li><a href="products.php">Mua sắm</a></li>
                        <?php if(isset($_SESSION['vaitro']) and ($_SESSION['vaitro']=='admin' or $_SESSION['vaitro']=='kho' or $_SESSION['vaitro']=='phucvu') )
                        echo '<li><a href="admin.php">Admin Page</a></li>';
                        ?>
                        
                        <li><a href="checkout.php" >Giỏ hàng</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</body>
</html>