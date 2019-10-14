<?php

include 'connection/connection.php';
 session_start();

 $TenH = $_POST['name'];
 $Gia = $_POST['price'];
 $TheLoai = $_POST['category'];

    $ChiTiet = $_POST['detail'];


 $SlCon = $_POST['quantity'];

$name=$_FILES['file']['name'];
  $size=$_FILES['file']['size'];
  $type=$_FILES['file']['type'];
  $temp=$_FILES['file']['tmp_name'];
  move_uploaded_file($temp,"images/".$name);
$HinhAnh = "http://localhost/HQTCSDL/images/".$name;





$query = "INSERT into HANG (TenH,HinhAnh,SlCon,TheLoai,Gia,ChiTiet) values ('$TenH','$HinhAnh','$SlCon','$TheLoai','$Gia',' $ChiTiet')";

$run = sqlsrv_query($conn, $query);

if($run) {

header("location: admin_products.php?category=$TheLoai");
}









 ?>
