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

$query = "SELECT * FROM NGUOIDUNG WHERE MaND='$MaND'";
$result= sqlsrv_query($conn, $query);
$rows = sqlsrv_fetch_array($result);
if($rows['MatKhau']!=$mk)
{
	$mk = password_hash($mk, PASSWORD_DEFAULT);
}



$query = "UPDATE NGUOIDUNG set HoTen = N'$HoTen', Email = '$email', SDT = '$sdt', DiaChi = N'$dc', MatKhau = '$mk', VaiTro = '$vt' where MaND = '$MaND'";
$run = sqlsrv_query($conn, $query);
if($run) {

header("location: admin_users.php");
}









 ?>
