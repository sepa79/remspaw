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
        <!-- <table datatable="SpawarkiW_Serwisie" dt-options="ctrl.dtOptions" dt-columns="ctrl.dtColumns" dt-instance="ctrl.dtInstance" class="table-sm table-bordered table-hover" cellspacing="0" width="100%">
        </table> -->
<table ng-table="ctrl.tableParams" class="table table-sm table-bordered table-hover" show-filter="false">
  <tr ng-repeat="row in $data">
    <td data-title="'Data Przyjecia'">{{row.dataPrzyjecia}}</td>
    <td data-title="'Numer'">{{row.numerPrzyjecia}}</td>
    <td data-title="'Klient'">{{row.Klient.nazwaFirmy}}</td>
    <!-- <td data-title="'Producent'">{{row.Urzadzenie.Producent.nazwaFirmy}}</td> -->
    <td data-title="'Urzadzenie'">{{row.Urzadzenie.nazwa}}</td>
    <td data-title="'Status'">
      <md-icon md-font-icon="{{ctrl.getIcon(row.State.state)}} fa-lg">
        <md-tooltip md-direction="botom">{{ctrl.getTooltip(row.State.state)}}</md-tooltip>
      </md-icon>
    </td>
    <td data-title="'Akcje'">
      <md-button ng-repeat="state in ctrl.getNextState(row.State.state)" class="md-raised md-primary" ng-click="ctrl.nextState(row, state)">
        <md-icon md-font-icon="{{ctrl.getIcon(state)}} fa-lg"></md-icon>
        <md-tooltip md-direction="botom">{{ctrl.getActionName(state)}}</md-tooltip>
      </md-button>
      <md-button ng-repeat="state in ctrl.getNextWorkshopState(row.State.state)" class="md-raised" ng-click="ctrl.nextState(row, state)">
        <md-icon md-font-icon="{{ctrl.getIcon(state)}} fa-lg"></md-icon>
        <md-tooltip md-direction="botom">{{ctrl.getActionName(state)}}</md-tooltip>
      </md-button>
      <md-button ng-repeat="state in ctrl.getAbortState(row.State.state)" class="md-raised md-warn" ng-click="ctrl.nextState(row, state)">
        <md-icon md-font-icon="{{ctrl.getIcon(state)}} fa-lg"></md-icon>
        <md-tooltip md-direction="botom">{{ctrl.getActionName(state)}}</md-tooltip>
      </md-button>
    </td>
    <td data-title="'Historia'">
      <p ng-repeat="state in row.StateHistory">{{state.date}} - {{state.state}}</p>
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
  
  <?php include ($_SERVER['DOCUMENT_ROOT'].'/includes.php'); ?>

  <script src="/app/StanySerwisuCtrl.js"></script>
  </body>
</html>