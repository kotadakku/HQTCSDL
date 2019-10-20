
<?php
$serverName = "DESKTOP-7BC5JCJ";  
$connectionInfo = array("Database"=>"QLCuaHang", "CharacterSet" => "UTF-8");

$conn= sqlsrv_connect( $serverName,$connectionInfo);
if($conn ) {
    
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>

