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

 $MaND = $_POST['cid'];
 $HoTen = $_POST['ht'];
 $email = $_POST['email'];
 $sdt = $_POST['sdt'];
$dc = $_POST['dc'];
$mk = $_POST['mk'];
$vt = $_POST['vt'];
$password = password_hash($mk, PASSWORD_DEFAULT);


$query = "UPDATE NGUOIDUNG set HoTen = '$HoTen', Email = '$email', SDT = '$sdt', DiaChi = '$dc', MatKhau = '$password', VaiTro = '$vt' where MaND = '$MaND'";
$run = sqlsrv_query($conn, $query);
if($run) {

header("location: admin_users.php");
}









 ?>
