<?php include_once('connection/connection.php');
session_start();

$MAND = $_REQUEST['cid'];
$query = "UPDATE DONHANG Set TrangThai=1 where MaND='$MAND'";
$result =sqlsrv_query($conn, $query);
if($result)
{

	header("location: index.php");
}
else
{
	print 'er!';

}

 ?>