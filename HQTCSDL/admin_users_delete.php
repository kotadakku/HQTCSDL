<?php
include 'connection/connection.php';
 session_start();
 // include 'redirectadmin.php';

$MaND = $_REQUEST['cid'];

$query = "DELETE FROM NGUOIDUNG WHERE MaND='$MaND'";
$result = sqlsrv_query($conn, $query);

if($result)
{

  header("location:admin_users.php");
}
?>
