<?php

include 'connection/connection.php';
 session_start();

 $MaND = $_POST['cid'];
 $HoTen = $_POST['ht'];
 $email = $_POST['email'];
 $sdt = $_POST['sdt'];

$dc = $_POST['dc'];


$mk = $_POST['mk'];
$vt = $_POST['vt'];


$query = "UPDATE NGUOIDUNG set HoTen = '$HoTen', Email = '$email', SDT = '$sdt', DiaChi = '$dc', MatKhau = '$mk', VaiTro = '$vt' where MaND = '$MaND'";
$run = sqlsrv_query($conn, $query);
if($run) {

header("location: admin_users.php");
}









 ?>
