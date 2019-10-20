<?php
include '../connection/connection.php';
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
$_SESSION['name'] = $row['HoTen'];
$_SESSION['email']= $row['Email'];
 $_SESSION['vaitro'] = $row['VaiTro'];

	header("location: products.php");
}
else {
	header("location: account.php");
}
// else {
// 	header("location: loginfail.php");
// }


if($errflag) {
	$_SESSION['ERRMSG_ARR'] = $errmsg_arr;
	session_write_close();
	header("location: products.php");
	exit();
}

?>
