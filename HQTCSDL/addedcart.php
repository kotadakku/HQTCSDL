<?php
 session_start();
 
 include 'connection/connection.php';
 if(isset($_SESSION['name']))
    { 
$TrangThai = 0;
$MaH = $_POST['pid'];
$SLMua = $_POST['quantity'];
$Gia = $_POST['price'];
$SLCon = $_POST['net'];
$TongTien = $SLMua*$Gia;
$SLCon = $SLCon - $SLMua;

$query1 = "UPDATE HANG set SlCon = '$SLCon' where MaH = '$MaH'";
$result1 = sqlsrv_query($conn, $query1);

$email = $_SESSION['email'];
$query2 = "SELECT * from NGUOIDUNG where email='$email'";
$result2= sqlsrv_query($conn, $query2);
while($rows2 = sqlsrv_fetch_array($result2, SQLSRV_FETCH_ASSOC)){
  $MAND =$rows2['MAND'];
}

$query = "INSERT into DONHANG(MaND,MaH,TrangThai,SLMua) values ('$MAND','$MaH','$TrangThai','$SLMua')";
$result = sqlsrv_query($conn, $query);



if($result && $result1)
{
header("location:checkout.php");
}

}
else
{
	header("location:checkout.php");
}
?>
