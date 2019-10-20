 <?php
include '../connection/connection.php';
?>

<!DOCTYPE html>
<html>
<head>
    <tille>Quản lý đơn hàng</tille>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>DataTables example - Bootstrap 4</title>
    <link rel="stylesheet" type="text/css" href="./css/site-examples.css">
    <link rel="stylesheet" type="text/css" href="./css/bootstrap.css">
    <script type="text/javascript" language="javascript" src="./js/jquery-3.3.1.js.download"></script>
    <script type="text/javascript" language="javascript" src="./js/jquery.dataTables.min.js.download"></script>
    <script type="text/javascript" language="javascript" src="./js/dataTables.bootstrap4.min.js.download"></script>
   
    <script type="text/javascript" class="init">
    $(document).ready(function() {
        $('#example').DataTable();
    });
    </script>
</head>

<body class="wide comments example dt-example-bootstrap4">
    <a name="top" id="top"></a>
    <div class="fw-background">
        <div></div>
    </div>
    <div class="fw-container">  
    <?php include('admin_header.php') ?>  
        <div class="fw-body">
            <div class="content">
                <div id="example_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">
                        <div class="col-sm-12">
                            <table id="example" class="table table-striped table-bordered dataTable" style="width: 100%;" role="grid" aria-describedby="example_info">
                                <thead>
                                    <tr role="row">
                                        <th class="sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 36px;">Mã đơn hàng</th>
                                        <th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 93px;">Tên hàng</th>
                                        <th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 93px;">Tên khách</th>                                    
                                        <th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 93px;">Tên loại</th>
                                        <th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 36px;">Trạng thái</th>
                                        <th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 36px;">Số lượng mua</th>
                                        <th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 36px;">Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    <?php
                        $query = "SELECT * FROM view_DS_DONHANG";
                        $result = sqlsrv_query($conn, $query);
                        while($rows = sqlsrv_fetch_array($result)) :
                        ?>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1"><?php echo $rows['MADH']; ?></td>
                                        <td><?php echo $rows['TenH']; ?></td>
                                        <td><?php echo $rows['HoTen']; ?></td>
                                        <td><?php echo $rows['TenL']; ?></td>
                                        <td><?php  if($rows['TrangThai']==1) echo 'Đã mua'; else echo 'Chưa mua'; ?></td>
                                        <td><?php echo $rows['SLMua']; ?></td>
                                        <td><?php echo $rows['TongTien']; ?></td>
                                    </tr>
                                    <?php endwhile ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                    </div>
                </div>
            </div>
        </div>
    </div>    
</body>
</html>

