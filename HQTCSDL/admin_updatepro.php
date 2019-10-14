<?php

include 'connection/connection.php';
 session_start();

 $MaH = $_POST['pid'];
 $TenH = $_POST['name'];
 $Gia = $_POST['price'];
 $TheLoai = $_POST['category'];

$ChiTiet = $_POST['detail'];


$SlCon = $_POST['quantity'];
$year = $_POST['year'];

$name=$_FILES['file']['name'];
  $size=$_FILES['file']['size'];
  $type=$_FILES['file']['type'];
  $temp=$_FILES['file']['tmp_name'];
  move_uploaded_file($temp,"images/".$name);
$HinhAnh = "http://localhost/HQTCSDL/images/".$name;



$query = "UPDATE HANG set TenH = '$TenH', HinhAnh = '$HinhAnh', SlCon = '$SlCon', TheLoai = '$TheLoai', Gia = '$Gia', ChiTiet = '$ChiTiet' where MaH = '$MaH'";
$run = sqlsrv_query($conn, $query);
if($run) {

header("location: admin_single.php?pid=$MaH");
}









 ?>
