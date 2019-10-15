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

$MaND = $_REQUEST['cid'];

$query = "DELETE FROM NGUOIDUNG WHERE MaND='$MaND'";
$result = sqlsrv_query($conn, $query);

if($result)
{

  header("location:admin_users.php");
}
?>
