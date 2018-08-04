<!DOCTYPE html>
<html lang="en">
  <head><?php include ($_SERVER['DOCUMENT_ROOT'].'/header.php'); ?></head>
  <body><?php include ($_SERVER['DOCUMENT_ROOT'].'/navbar.php'); ?>
    <div ng-app="RemSpawApp" ng-controller="StanySerwisuCtrl as ctrl" ng-cloak class="card">
      <div class="card-header">
        Lista spawarek w serwisie
      </div>
      <div class="card-body">
        <hr>
        <table datatable="SpawarkiW_Serwisie" dt-options="ctrl.dtOptions" dt-columns="ctrl.dtColumns" dt-instance="ctrl.dtInstance" class="table-sm table-bordered table-hover" cellspacing="0" width="100%">
        </table>
      </div>
      <div class="card-footer text-muted">
        &copy; Remspaw 2018
      </div>
    </div> <!-- /card -->
  <!-- ================================================== -->
  <!-- Placed at the end of the document so the pages load faster -->
  <link rel="stylesheet" type="text/css" href="/DataTables/datatables.min.css">
  <link rel="stylesheet" type="text/css" href="/DataTables/dataTables.bootstrap4.min.css">

  <script src="/DataTables/datatables.min.js"></script>
  <script src="/DataTables/dataTables.bootstrap4.min.js"></script>
  <script src="/Angular-Datatables/angular-datatables.min.js"></script>
  <script src="/Angular-Datatables/plugins/bootstrap/angular-datatables.bootstrap.min.js"></script>
  
  <!-- <script src="/app/scripts.js"></script> -->
  <script src="/app/AbstractAutocompleteService.js"></script>
  <script src="/app/CustomerService.js"></script>
  <script src="/app/MachineryService.js"></script>
  <script src="/app/ManufacturerService.js"></script>
  <script src="/app/RepairsWarehouseService.js"></script>
  <script src="/app/RemSpawApp.js"></script>
  <!-- <script src="/app/PrzyjecieSpawarkiCtrl.js"></script> -->
  <script src="/app/StanySerwisuCtrl.js"></script>
  </body>
</html>