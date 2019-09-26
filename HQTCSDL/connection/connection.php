
<?php
$serverName = "DESKTOP-7BC5JCJ"; 

$connectionInfo = array( "Database"=>"BAITAP1", "UID"=>"user1", "PWD"=>"14phuong",  "CharacterSet"=>"UTF-8");

$conn= sqlsrv_connect( $serverName,$connectionInfo);
if($conn ) {
     echo "Connection established.<br />";
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}

$sql="SELECT * FROM KHACHHANG";
$result= sqlsrv_query($conn,$sql);

while( $row = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC) ) {
      echo $row['FAX'].$row['TENCONGTY']."<br />";
}

?>