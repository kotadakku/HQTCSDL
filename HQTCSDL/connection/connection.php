
<?php
$serverName = "DESKTOP-7BC5JCJ";  

$connectionInfo = array( "Database"=>"QLBanHang", "UID"=>"user1", "PWD"=>"14phuong",  "CharacterSet"=>"UTF-8");

$conn= sqlsrv_connect( $serverName,$connectionInfo);
if($conn ) {
     echo "Connection established.<br />";
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}

?>