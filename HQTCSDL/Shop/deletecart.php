<?php
include '../connection/connection.php';
 session_start();


$MAND = $_REQUEST['cid'];
$MaH = $_REQUEST['pid'];
echo $MAND.$MaH;
$SLMua = (int) $_REQUEST['quantity'];

$query = "SELECT *  FROM HANG WHERE MaH = '$MaH'";
$result = sqlsrv_query($conn, $query);
$row1 = sqlsrv_fetch_array($result,SQLSRV_FETCH_ASSOC);


$queryde = "DELETE FROM DONHANG WHERE MaH = '$MaH' and TrangThai='0' and MaND='$MAND'";
$resultde = sqlsrv_query($conn, $queryde);


if($result && $resultde)
{

  header("location:checkout.php");
}
?>