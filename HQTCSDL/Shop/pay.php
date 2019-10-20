<?php include_once('../connection/connection.php');
session_start();

$MAND = $_REQUEST['cid'];
$query = "UPDATE DONHANG Set TrangThai=1, NgayMua=getdate() where MaND='$MAND' and TrangThai=0";
$result =sqlsrv_query($conn, $query);
if($result)
{

	header("location: products.php");
}
else
{
	print 'er!';

}

 ?>