<?php
include 'connection/connection.php';
session_start();
$errmsg_arr = array();
$errflag = false;
// configuration
// new data

$user = $_POST['email'];
$password = $_POST['password'];



// query
$query="SELECT * FROM NGUOIDUNG WHERE email= '$user' AND MatKhau= '$password'";

$result = sqlsrv_query($conn,$query);
if($result) {

$_SESSION['email'] = $user;
$_SESSION['password'] = $password;

$query="SELECT * FROM NGUOIDUNG WHERE email= '$user'";

$result = sqlsrv_query($conn,$query);
$rows = sqlsrv_fetch_array($result);
$_SESSION['name'] = $rows['HoTen'];

	header("location: index.php");
}
// else {
// 	header("location: loginfail.php");
// }


if($errflag) {
	$_SESSION['ERRMSG_ARR'] = $errmsg_arr;
	session_write_close();
	header("location: index.php");
	exit();
}

?>
