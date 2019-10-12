<?php

include 'connection/connection.php';
 session_start();

 $name = $_POST['name'];
 $phone = $_POST['phone'];
 $pass = $_POST['password'];
 $email = $_POST['email'];

  $query1 = "SELECT * FROM NGUOIDUNG WHERE Email = '$email'";
  $result1= sqlsrv_query($connectionInfo,$query1);
  // $stm = $conn->prepare("SELECT * FROM customers WHERE email = '$email'");
  // // $stm->bindParam(1,$_POST['email']);
  //  $stm->execute();
    $ze = sqlsrv_num_rows($result1);
  if( $ze > 0)
  {
 header("location: invalid.php");
  }
 else {

   $query = "INSERT into NGUOIDUNG(HoTen,MatKhau,Email,SDT) values ($name','$phone','$pass','$email')";

 // $run = $conn->prepare($query);
 // $run->bindparam(1,$name);
 // $run->bindparam(2,$pass);
 // $run->bindparam(3,$email);
 // $run->bindparam(4,$phone);

$result= sqlsrv_query($conn,$query);
  // $run->execute();

 if($result) {
 }
$_SESSION['email'] = $email;
$_SESSION['name'] = $name;

	header("location: index.php");

}
 ?>
