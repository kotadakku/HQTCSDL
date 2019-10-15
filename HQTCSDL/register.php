<?php

include 'connection/connection.php';
 session_start();

 $name = $_POST['name'];
 $phone = $_POST['phone'];
 $pass = $_POST['password'];
 $email = $_POST['email'];
 $diachi = $_POST['diachi'];

 $password = password_hash($pass, PASSWORD_DEFAULT);
 echo $password;

  $query1 = "SELECT * FROM NGUOIDUNG WHERE Email = '$email'";
  $result1= sqlsrv_query($conn,$query1);
    $ze = sqlsrv_num_rows($result1);
  if( $ze > 0)
  {
 echo 'error';
  }
 else {
   echo $password.$name.$phone.$email.$diachi.$pass;

   $query = "INSERT into NGUOIDUNG(HoTen,SDT,MatKhau,Email,DiaChi) values ('$name','$phone','$password','$email','$diachi')";

$result= sqlsrv_query($conn,$query);

 if($result) {
 }
$_SESSION['email'] = $email;
$_SESSION['name'] = $name;

	header("location: index.php");

 }
 ?>
