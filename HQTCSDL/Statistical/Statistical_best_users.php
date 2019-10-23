
<?php
include '../connection/connection.php';
// session_start();
//    if(isset($_SESSION['vaitro']))
// {

//    if($_SESSION['vaitro']!='admin' and $_SESSION['vaitro']!='kho' and $_SESSION['vaitro']!='phucvu')
//    {
//      header("location:../Shop/account.php");
//    }
// }
// else
// {
//  header("location: ../Shop/account.php");
// }

?>
<!DOCTYPE html>
<html>
<head>
<title>Thống kê</title>
<link rel="stylesheet" href="">
<link href="../css/style.css" rel="stylesheet" type="text/css" media="all" />
<link href="../css/component.css" rel='stylesheet' type='text/css' />
<link rel="stylesheet" href="../css/flexslider.css" type="text/css" media="screen" />
<link rel="stylesheet" type="text/css" href="../css/site-examples.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <script type="text/javascript" language="javascript" src="../js/jquery-3.3.1.js.download"></script>
    <script type="text/javascript" language="javascript" src="../js/jquery.dataTables.min.js.download"></script>
    <script type="text/javascript" language="javascript" src="../js/dataTables.bootstrap4.min.js.download"></script>
   
    <script type="text/javascript" class="init">
    $(document).ready(function() {
        $('#example').DataTable();
    });
    </script>
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>

  <script type="text/javascript" src="../js/bootstrap-3.1.1.min.js"></script>
  <script src="../js/simpleCart.min.js"> </script>


</head>
<body class="wide comments example dt-example-bootstrap4">
    <a name="top" id="top"></a>
    <div class="fw-background">
        <div></div>
    </div>
    <div class="fw-container">  
    <?php include('../Admin/admin_header.php') ?>  
        <div class="fw-body">
            <div class="content">
                <div id="example_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class=" login-right wow fadeInRight" data-wow-delay="0.4s">
            <div class="alert-link">
                    <center>Bảng dữ liệu<br>---</center>
                </div>
                
                <table id="example" class="table table-striped table-bordered dataTable text-center" style="width: 100%;" role="grid" aria-describedby="example_info">

                                <thead>
                                    <tr role="row">
                                        <th class="sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 125px;">Mã số</th>
                                        <th class="sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 125px;">Họ tên</th>
                                         <th class="sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 125px;">Email</th>
                                          <th class="sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 125px;">Số điện thoại</th>
                                          <th class="sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 125px;">Số lượng mua</th>
                                        <th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 199px;">Tổng tiền(VND)</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    <?php
                                    $sql = "SELECT * FROM view_best_ND";
    $result = @sqlsrv_query($conn,$sql);
       while($row = @sqlsrv_fetch_array($result)):
                        ?>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1"><?php echo $row['MAND']; ?></td>
                                        <td ><?php echo $row['HoTen']; ?></td>
                                        <td ><?php echo $row['Email']; ?>
                                        <td ><?php echo $row['SDT']; ?>
                                        <td><?php echo $row['SlMua']; ?></td>
                                        <td><?php echo $row['TongTien']; ?></td>
                                    </tr>
                                    <?php endwhile ?>
                                </tbody>
                                <tfoot>
                                   
                                    <tr>
                                        <td colspan="4">Tổng số</td>
                                        <?php  $tsql_callSP = "{call sp_TongSlMua(  ? )}";
            $Tong = 0.0;  
            $params = array(   
                             
                             array(&$Tong, SQLSRV_PARAM_OUT)  
                           );  
              
            $stmt3 = sqlsrv_query( $conn, $tsql_callSP, $params); ?>
                                        <td><?php echo $Tong; ?></td>
                                        <?php  $tsql_callSP = "{call sp_TongTien(  ? )}";
            $Tong = 0.0;  
            $params = array(   
                             
                             array(&$Tong, SQLSRV_PARAM_OUT)  
                           );  
              
            $stmt3 = sqlsrv_query( $conn, $tsql_callSP, $params); ?>

                                        <td><?php echo $Tong; ?></td>
                                    </tr>
                                </tfoot>
                            </table>
        </div>
    </div>    
</body>
</html>

