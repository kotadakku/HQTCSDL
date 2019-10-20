<?php

    session_start();
    include_once '../connection/connection.php';
    $q = "SELECT * from HANG";
    $result= sqlsrv_query($conn,$q);
    $rows= sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);    
 ?>

<!DOCTYPE html>
<html>
<head>
<title>Shop</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Eshop Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template,
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />

<link rel="stylesheet" href="../css/flexslider.css" type="text/css" media="screen" />
<link href="../css/bootstrap.css" rel='stylesheet' type='text/css' />
<script src="../js/jquery.min.js"></script>
<link href="../css/style.css" rel="stylesheet" type="text/css" media="all" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/simpleCart.min.js"> </script>

</head>
<body>
    <!-- header-section-starts -->
    <div class="header">
        <div class="header-top-strip">
            <div class="container">
                <div class="header-top-left">
                    <ul>
                        <li>
                            <ul>
                        <?php if(isset($_SESSION['name']))
                                {
                                    echo '<li><a href=""><span class="glyphicon glyphicon-user"></span> '.$_SESSION['name'].'
                        
                        </a></li>/
                        <li><a href="logout.php"><span class="glyphicon glyphicon-reply"> </span>Đăng xuất</a></li>'; 
                                }
                                else
                                {
                                    echo '<li><a href="account.php"><span class="glyphicon glyphicon-user"></span>Đăng nhập
                        
                        </a></li>/
                        <li><a href="register.php"><span class="glyphicon glyphicon-reply"> </span>Tạo tài khoản</a></li>'; 
                                }
                                ?>
                            </ul>
                        </li>
                        <li class="align-self-end">
                            <ul>
                                <li class=""><input type="search" name="" value="" placeholder=""></li>
                       
                        
                        <li><a href="checkout.php" >Giỏ hàng</a></li>
                         <?php if(isset($_SESSION['vaitro']) and ($_SESSION['vaitro']=='admin' or $_SESSION['vaitro']=='kho' or $_SESSION['vaitro']=='phucvu') )
                        echo '<li><a href="../Admin/admin_products.php">Admin Page</a></li>';
                        ?>
                    </ul>
                </li>
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
                    <div class="logo">
                        <h1><a href="products.php">SHOPPING</a></h1>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</body>
</html>