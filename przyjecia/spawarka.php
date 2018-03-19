<!DOCTYPE html>
<html lang="en">
  <head><?php include ($_SERVER['DOCUMENT_ROOT'].'/header.php'); ?></head>
  <body><?php include ($_SERVER['DOCUMENT_ROOT'].'/navbar.php'); ?>
  <div ng-app="RemSpawApp" ng-controller="MainController as mainApp" ng-cloak class="card">
    <div class="card-header">
      Formularz przyjęcia spawarki do naprawy.
    </div>
    <div class="card-body">
      <form ng-submit="mainApp.potwierdzPrzyjecie()">

      <h5 class="card-title">Dane klienta</h5>
      <div class="input-group mb-1">
        <div class="input-group-prepend">
          <span style="width:125px;" class="input-group-text">Nazwa firmy</span>
        </div>
        <input type="text" class="form-control" ng-model="mainApp.urzadzenie.nazwaFirmy" placeholder="Elwry z Górnego Śląska">
      </div>
      <div class="input-group mb-1">
        <div class="input-group-prepend">
          <span style="width:125px;" class="input-group-text">Telefon</span>
        </div>
        <input type="text" class="form-control" ng-model="mainApp.urzadzenie.telefon" placeholder="+48 1234 5678">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span style="width:125px;" class="input-group-text">Email</span>
        </div>
        <input type="text" class="form-control" ng-model="mainApp.urzadzenie.email" placeholder="ecik.masztalski@piekary.com">
      </div>

      <h5 class="card-title">Urządzenie</h5>
      <div class="input-group mb-1">
        <div class="input-group-prepend">
          <span style="width:125px;" class="input-group-text">Producent</span>
        </div>
        <input type="text" class="form-control" ng-model="mainApp.urzadzenie.producent" placeholder="ESAB abo inkszy Lincoln">
      </div>
      <div class="input-group mb-1">
        <div class="input-group-prepend">
          <span style="width:125px;" class="input-group-text">Model</span>
        </div>
        <input type="text" class="form-control" ng-model="mainApp.urzadzenie.model" placeholder="SuperSztrajfer-8">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span style="width:125px;" class="input-group-text">Nr seryjny</span>
        </div>
        <input type="text" class="form-control" ng-model="mainApp.urzadzenie.numerSeryjny" placeholder="Acht-koma-acht">
      </div>

      <h5 class="card-title">Wyposażenie urządzenia</h5>

      <div class="input-group mb-1">
        <div class="input-group-prepend">
          <span style="width:300px;" class="input-group-text">Uchwyt spawalniczy lub plazmowy</span>
        </div>
        <div class="input-group-append">
          <div class="input-group-text">
            <input type="checkbox" class="form-control" ng-model="mainApp.urzadzenie.maUchwyt">
          </div>
        </div>
      </div>
      <div class="input-group mb-1">
        <div class="input-group-prepend">
          <span style="width:300px;" class="input-group-text">Uchwyt masowy</span>
        </div>
        <div class="input-group-append">
          <div class="input-group-text">
            <input type="checkbox" class="form-control" ng-model="mainApp.urzadzenie.maUchwytMasowy">
          </div>
        </div>
      </div>
      <div class="input-group mb-1">
        <div class="input-group-prepend">
          <span style="width:300px;" class="input-group-text">Adaptor</span>
        </div>
        <div class="input-group-append">
          <div class="input-group-text">
            <input type="checkbox" class="form-control" ng-model="mainApp.urzadzenie.maAdaptor">
          </div>
        </div>
      </div>
      <div class="input-group mb-1">
        <div class="input-group-prepend">
          <span style="width:300px;" class="input-group-text">Drut</span>
        </div>
        <div class="input-group-append">
          <div class="input-group-text">
            <input type="checkbox" class="form-control" ng-model="mainApp.urzadzenie.maDrut">
          </div>
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span style="width:300px;" class="input-group-text">Reduktor</span>
        </div>
        <div class="input-group-append">
          <div class="input-group-text">
            <input type="checkbox" class="form-control" ng-model="mainApp.urzadzenie.maReduktor">
          </div>
        </div>
      </div>

      <h5 class="card-title">Przyjęcie</h5>

      <div class="input-group mb-1">
        <div class="input-group-prepend">
          <span style="width:300px;" class="input-group-text">Wyceń naprawę</span>
        </div>
        <div class="input-group-append">
          <div class="input-group-text">
            <input type="checkbox" class="form-control" ng-model="mainApp.urzadzenie.czyWyceniac">
          </div>
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span style="width:125px;" class="input-group-text">Data przyjęcia</span>
        </div>
        <input type="date" class="form-control" ng-model="mainApp.urzadzenie.dataPrzyjecia" placeholder="dd/mm/rrrr">
        <div class="input-group-append">
          <button type="submit" class="btn btn-primary">Przyjęto na serwis</button>
        </div>
      </div>

      </form>
    </div>
    <div class="card-footer text-muted">
      &copy; Remspaw 2018
    </div>
  </div>

<!-- ================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
  <link rel="stylesheet" type="text/css" href="/DataTables/datatables.min.css">
  <link rel="stylesheet" type="text/css" href="/DataTables/dataTables.bootstrap4.min.css">

  <script src="/DataTables/datatables.min.js"></script>
  <script src="/DataTables/dataTables.bootstrap4.min.js"></script>
  <script src="/Angular-Datatables/angular-datatables.min.js"></script>
  <script src="/Angular-Datatables/plugins/bootstrap/angular-datatables.bootstrap.min.js"></script>
  <script src="/js/scripts.js"></script>
  </body>
</html>