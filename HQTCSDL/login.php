<?php
include 'connection/connection.php';
session_start();
$errmsg_arr = array();
$errflag = false;
// configuration
// new data

$email = $_POST['email'];
$ps = $_POST['password'];
echo $ps;
echo $email;

// password_verify($password,$pshash);

$q = "SELECT * FROM NGUOIDUNG WHERE email='$email'";
      $result=sqlsrv_query($conn,$q);
      $row=sqlsrv_fetch_array($result,SQLSRV_FETCH_ASSOC);
        $pshash= $row['MatKhau'];  
        echo $pshash;
        if(password_verify($ps,$pshash))
            {            




// $query="SELECT * FROM NGUOIDUNG WHERE email= '$user' AND MatKhau= '$password'";

// $result = sqlsrv_query($conn,$query);
// if($result) {

// $_SESSION['email'] = $user;
// $_SESSION['password'] = $password;

// $query="SELECT * FROM NGUOIDUNG WHERE email= '$user'";

// $result = sqlsrv_query($conn,$query);
// $rows = sqlsrv_fetch_array($result);
$_SESSION['name'] = $row['HoTen'];
$_SESSION['email']= $row['Email'];
 $_SESSION['vaitro'] = $row['VaiTro'];

	header("location: index.php");
}
else {
	header("location: account.html");
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
