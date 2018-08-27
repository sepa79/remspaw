<!DOCTYPE html>
<html lang="en">
  <head><?php include ($_SERVER['DOCUMENT_ROOT'].'/header.php'); ?></head>
  <body><?php include ($_SERVER['DOCUMENT_ROOT'].'/navbar.php'); ?>
    <div ng-app="RemSpawApp" ng-controller="StanyWarsztatuCtrl as ctrl" ng-cloak class="card">
      <div class="card-header">
        Lista spawarek do naprawy
      </div>
      <div class="card-body">
        <hr>
        <!-- <table datatable="SpawarkiW_Naprawie" dt-options="ctrl.dtOptions" dt-columns="ctrl.dtColumns" dt-instance="ctrl.dtInstance" class="table-sm table-bordered table-hover" cellspacing="0" width="100%"> -->
        <!-- </table> -->

<table ng-table="ctrl.tableParams" class="table table-sm table-bordered table-hover" show-filter="true">
  <tr ng-repeat="row in $data">
    <td data-title="'Data Przyjecia'">{{row.dataPrzyjecia}}</td>
    <td data-title="'Numer'">{{row.numerPrzyjecia.value}}</td>
    <td data-title="'Klient'">{{row.Klient.nazwaFirmy}}</td>
    <td data-title="'Producent'">{{row.Urzadzenie.Producent.nazwaFirmy}}</td>
    <td data-title="'Urzadzenie'">{{row.Urzadzenie.nazwa}}</td>
    <td data-title="'Akcje'"> 
    <md-button class="md-raised md-primary" ng-click="ctrl.startValuation(row.id)">Wyceń</md-button>
    </td>
  </tr>
</table>

      </div>
      <div class="card-footer text-muted">
        &copy; Remspaw 2018
      </div>
    </div> <!-- /card -->
  <!-- ================================================== -->
  <!-- Placed at the end of the document so the pages load faster -->
  <link rel="stylesheet"; href="https://unpkg.com/ng-table@2.0.2/bundles/ng-table.min.css">
  <script src="https://unpkg.com/ng-table@2.0.2/bundles/ng-table.min.js"></script>

  <!-- <link rel="stylesheet" type="text/css" href="/DataTables/datatables.min.css">
  <link rel="stylesheet" type="text/css" href="/DataTables/dataTables.bootstrap4.min.css">

  <script src="/DataTables/datatables.min.js"></script>
  <script src="/DataTables/dataTables.bootstrap4.min.js"></script>
  <script src="/Angular-Datatables/angular-datatables.min.js"></script>
  <script src="/Angular-Datatables/plugins/bootstrap/angular-datatables.bootstrap.min.js"></script> -->
  
  <!-- <script src="/app/scripts.js"></script> -->
  <script src="/app/AbstractAutocompleteService.js"></script>
  <script src="/app/CustomerService.js"></script>
  <script src="/app/MachineryService.js"></script>
  <script src="/app/ManufacturerService.js"></script>
  <script src="/app/RepairsWarehouseService.js"></script>
  <script src="/app/PersistentVarsService.js"></script>
  <script src="/app/RemSpawApp.js"></script>

  <!-- <script src="/app/PrzyjecieSpawarkiCtrl.js"></script> -->
  <script src="/app/StanyWarsztatuCtrl.js"></script>
  </body>
</html>