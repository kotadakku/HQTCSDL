<?php

include 'connection/connection.php';
 session_start();
 if(isset($_SESSION['vaitro']))
{

   if($_SESSION['vaitro']!='admin' and $_SESSION['vaitro']!='kho' and $_SESSION['vaitro']!='phucvu')
   {
   	header("location: account.html");
   }
}
else
{
	header("location: account.html");
}

 $MaH = $_POST['pid'];
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



$query = "UPDATE HANG set TenH = '$TenH', HinhAnh = '$HinhAnh', SlCon = '$SlCon', MaL = '$TheLoai', Gia = '$Gia', ChiTiet = '$ChiTiet' where MaH = '$MaH'";
$run = sqlsrv_query($conn, $query);
if($run) {

header("location: admin_users.php");
}









 ?>
