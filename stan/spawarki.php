<!DOCTYPE html>
<html lang="en">
  <head><?php include ($_SERVER['DOCUMENT_ROOT'].'/header.php'); ?></head>
  <body><?php include ($_SERVER['DOCUMENT_ROOT'].'/navbar.php'); ?>
    <div ng-app="RemSpawApp" ng-controller="StanySerwisuCtrl as ctrl" ng-cloak class="card">
      <div class="card-header">
        Lista spawarek w serwisie
      </div>
      <div class="card-body">

<table ng-table="ctrl.tableParams" class="table table-sm table-bordered table-hover" show-filter="false" ng-controller="StateCtrl as stateCtrl">
  <tr ng-repeat="row in $data">
    <td data-title="'Przyjęcie'">{{row.dataPrzyjecia | moment:'format':'L'}}</td>
    <td data-title="'Numer'">{{row.numerPrzyjecia}}</td>
    <td data-title="'Klient'">{{row.Klient.nazwaFirmy}}</td>
    <!-- <td data-title="'Producent'">{{row.Urzadzenie.Producent.nazwaFirmy}}</td> -->
    <td data-title="'Urzadzenie'">{{row.Urzadzenie.nazwa}}</td>
    <td data-title="'Status'">
      <md-icon md-font-icon="{{stateCtrl.getIcon(row.State.state)}} fa-lg">
        <md-tooltip md-direction="botom">{{stateCtrl.getTooltip(row.State.state)}}</md-tooltip>
      </md-icon>
    </td>
    <td data-title="'Akcje'">
      <md-button ng-repeat="state in stateCtrl.getNextOfficeState(row.State.state)" class="md-raised md-primary md-tableButton" ng-click="stateCtrl.gotoNextState($event, row, state)">
        <md-icon md-font-icon="{{stateCtrl.getIcon(state)}} fa-lg"></md-icon>{{stateCtrl.getActionName(state)}}
      </md-button>
      <md-button ng-repeat="state in stateCtrl.getNextWorkshopState(row.State.state)" class="md-raised md-tableButton" ng-click="stateCtrl.gotoNextState($event, row, state)">
        <md-icon md-font-icon="{{stateCtrl.getIcon(state)}} fa-lg"></md-icon>{{stateCtrl.getActionName(state)}}
      </md-button>
      <md-button ng-repeat="state in stateCtrl.getAbortState(row.State.state)" class="md-raised md-warn md-tableButton" ng-click="stateCtrl.gotoNextState($event, row, state)">
        <md-icon md-font-icon="{{stateCtrl.getIcon(state)}} fa-lg"></md-icon>{{stateCtrl.getActionName(state)}}
      </md-button>
    </td>
    <td data-title="'Historia'">
      <p ng-repeat="state in row.StateHistory">{{state.date | moment:'format':'L'}} - {{state.state}}</p>
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
  <link rel="stylesheet"; href="/css/ng-table.min.css">
  <script src="/js/ng-table.hack.js"></script>
  
  <?php include ($_SERVER['DOCUMENT_ROOT'].'/includes.php'); ?>

  <script src="/app/StateCtrl.js"></script>
  <script src="/app/StanySerwisuCtrl.js"></script>
  </body>
</html>