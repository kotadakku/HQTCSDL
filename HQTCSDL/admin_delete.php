<?php
include 'connection/connection.php';
 session_start();
 // include 'redirectadmin.php';
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

$MaH = $_REQUEST['pid'];

$query = "DELETE FROM HANG WHERE MaH='$MaH'";
$result = sqlsrv_query($conn, $query);

if($result)
{

  header("location:admin_products.php");
}
?>
