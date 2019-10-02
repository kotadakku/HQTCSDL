<div class="main-width">
            <div class="main-home">
                <div class="level1"></div>
                <div class="level2">
                    <div class="box-best-seller">
                        <div class="content">
                            <div class="slidingbox">

  <?php $sql="SELECT top 5 * FROM SanPham";
$result= sqlsrv_query($conn,$sql);

while( $row = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC) ) {
      ?>
                                <div class="box-boxgrid-container">
                                    <div class="boxgrid caption"><a href="https://hoanghamobile.com/nokia-61-plus-chinh-hang-p12978.html" target="_top"><img src="./Điện thoại di động gía rẻ nhất - Siêu thị điện thoại Hoàng Hà Mobile_files/201909231427060632_nokia-thumb.gif" alt="Samsung Galaxy A3"></a>
                                        <div class="cover boxcaption">
                                            <h3><?php  echo $row['TenSanPham']?></h3>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>   
                                <?php } ?>                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>