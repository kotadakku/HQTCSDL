<?php
include 'connection/connection.php';
 session_start();
 // include 'redirectadmin.php';

$MaH = $_REQUEST['pid'];
$TheLoai = $_REQUEST['cat'];

$query = "DELETE FROM HANG WHERE MaH='$MaH'";
$result = sqlsrv_query($conn, $query);

if($result)
{

  header("location:admin_products.php?category=$TheLoai");
}
?>
