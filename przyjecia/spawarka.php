<!DOCTYPE html>
<html lang="en">
  <head><?php include ($_SERVER['DOCUMENT_ROOT'].'/header.php'); ?></head>
  <body><?php include ($_SERVER['DOCUMENT_ROOT'].'/navbar.php'); ?>

<div ng-app="RemSpawApp" ng-cloak ng-controller="PrzyjecieSpawarkiCtrl as ctrl" ng-cloak class="inputErrors md-inline-form" layout-fill>
<br/>
<br/>
<br/>
  <md-content>
    <div>
      <form name="przyjecieSpawarki" ng-submit="ctrl.confirmReceipt(ctrl.urzadzenie)">

        <md-card>
          <md-card-header layout="row" style="padding-bottom: 0px;">
            <!-- <md-card-avatar>
              <md-icon class="md-avatar-icon" md-svg-icon="img/icons/menu.svg"></md-icon>
            </md-card-avatar> -->
            <md-card-header-text>
              <span class="md-title">Dane Klienta</span>
              <!-- <span class="md-subhead">subhead</span> -->
            </md-card-header-text>
            <md-card-actions layout="row" layout-align="end center">
              <md-button ng-disabled="ctrl.customerService.isAddButtonDisabled(przyjecieSpawarki)" class="md-raised md-primary" ng-click="ctrl.customerService.add()">
              <md-icon md-font-icon="fas fa-plus-square fa-lg"></md-icon>
              Dodej geszyft</md-button>
              <md-button ng-disabled="ctrl.customerService.isUpdateButtonDisabled(przyjecieSpawarki)" class="md-raised md-primary" ng-click="ctrl.customerService.update()">
              <md-icon md-font-icon="fas fa-save fa-lg"></md-icon>
              Zapisz zmiany</md-button>
              <md-button ng-disabled="ctrl.customerService.isResetButtonDisabled()" class="md-raised md-primary" ng-click="ctrl.customerService.init()">
              <md-icon md-font-icon="fas fa-trash-alt fa-lg"></md-icon>
              Zacznij jeszcze roz</md-button>
            </md-card-actions>
          </md-card-header>
          <md-card-content layout="column" layout-gt-md="row">

            <!-- Unused option: md-search-text-change="ctrl.customerService.userInputCallback(ctrl.customerService.model.nazwaFirmy)" -->
            <md-autocomplete flex required 
                append-icon="fas fa-address-card fa-lg"
                md-input-name="nazwaFirmy"
                md-input-minlength="5"
                md-input-maxlength="50"
                md-no-cache="true"
                md-selected-item="ctrl.customerService.selectedItem"
                md-selected-item-change="ctrl.customerService.selectExisting(ctrl.customerService.selectedItem)"
                md-search-text="ctrl.customerService.model.nazwaFirmy"
                md-items="item in ctrl.customerService.querySearch(ctrl.customerService.model.nazwaFirmy)"
                md-item-text="item.display"
                md-min-length="0"
                md-clear-button="false"
                md-floating-label="Nazwa firmy">
              <md-item-template>
                <span md-highlight-text="ctrl.customerService.searchText">{{item.display}}</span>
              </md-item-template>
              <div ng-messages="przyjecieSpawarki.nazwaFirmy.$error" ng-if="przyjecieSpawarki.nazwaFirmy.$touched">
                <div ng-message="required">Nie leć w kulki ino wpisuj!</div>
                <div ng-message-exp="['minlength', 'maxlength']">Rób tak cobyś wklepoł między 5 a 50 znaków</div>
              </div>
            </md-autocomplete>
            <md-input-container class="md-block">
              <label>Email</label>
              <md-icon md-font-icon="fas fa-envelope fa-lg"></md-icon>
              <input ng-model="ctrl.customerService.model.email" type="email" name="email" ng-pattern="/^.+@.+\..+$/">
              <div ng-messages="przyjecieSpawarki.email.$error">
                <div ng-message="pattern">Jaaa, no dyć to je email...</div>
              </div>
            </md-input-container>

            <md-input-container class="md-block">
              <label>Telefon</label>
              <md-icon md-font-icon="fas fa-phone-square fa-lg"></md-icon>
              <input ng-model="ctrl.customerService.model.telefon" name="telefon">
            </md-input-container>

          </md-card-content>

        </md-card>

        <md-card>
          <md-card-header layout="row" style="padding-bottom: 0px;">
            <!-- <md-card-avatar>
              <md-icon class="md-avatar-icon" md-svg-icon="img/icons/menu.svg"></md-icon>
            </md-card-avatar> -->
            <md-card-header-text>
              <span class="md-title">Urządzenie</span>
              <!-- <span class="md-subhead">subhead</span> -->
            </md-card-header-text>
            <md-card-actions layout="row" layout-align="end center">
              <md-button ng-disabled="ctrl.manufacturerService.isAddButtonDisabled(przyjecieSpawarki)" class="md-raised md-primary" ng-click="ctrl.addManufacturer()">
              <md-icon md-font-icon="fas fa-plus-square fa-lg"></md-icon>
              Dodej producenta</md-button>
              <md-button ng-disabled="ctrl.machineryService.isAddButtonDisabled(przyjecieSpawarki)" class="md-raised md-primary" ng-click="ctrl.machineryService.add()">
              <md-icon md-font-icon="fas fa-plus-square fa-lg"></md-icon>
              Dodej urzadzenie</md-button>
              <md-button ng-disabled="ctrl.isMachineFormUpdateButtonDisabled(przyjecieSpawarki)" class="md-raised md-primary" ng-click="ctrl.updateMachineForm(przyjecieSpawarki)">
              <md-icon md-font-icon="fas fa-save fa-lg"></md-icon>
              Zapisz zmiany</md-button>
              <md-button ng-disabled="ctrl.isMachineFormResetButtonDisabled()" class="md-raised md-primary" ng-click="ctrl.initMachineForm()">
              <md-icon md-font-icon="fas fa-trash-alt fa-lg"></md-icon>
              Zacznij jeszcze roz</md-button>
            </md-card-actions>
          </md-card-header>
          <md-card-content layout="column" layout-gt-md="row">

            <md-autocomplete flex-gt-sm required 
              append-icon="fas fa-industry fa-lg"
              md-input-name="producent"
              md-input-minlength="3"
              md-input-maxlength="50"
              md-no-cache="true"
              md-selected-item="ctrl.manufacturerService.selectedItem"
              md-selected-item-change="ctrl.selectManufacturer(ctrl.manufacturerService.selectedItem)"
              md-search-text="ctrl.manufacturerService.model.nazwaFirmy"
              md-items="item in ctrl.manufacturerService.querySearch(ctrl.manufacturerService.model.nazwaFirmy)"
              md-item-text="item.display"
              md-min-length="0"
              md-clear-button="false"
              md-floating-label="Producent">
              <md-item-template>
                <span md-highlight-text="ctrl.manufacturerService.searchText">{{item.display}}</span>
              </md-item-template>
              <div ng-messages="przyjecieSpawarki.producent.$error" ng-if="przyjecieSpawarki.producent.$touched">
                <div ng-message="required">Nie leć w kulki ino wpisuj!</div>
                <div ng-message-exp="['minlength', 'maxlength']">Rób tak cobyś wklepoł między 3 a 50 znaków</div>
              </div>
            </md-autocomplete>

            <!-- <md-input-container class="md-block" flex-gt-sm>
              <label>Producent</label>
              <md-icon md-font-icon="fas fa-cogs fa-lg"></md-icon>
              <input ng-model="ctrl.urzadzenie.producent">
            </md-input-container> -->
            
            <md-autocomplete flex-gt-sm required
              ng-disabled="ctrl.machineryService.manufacturerId==null"
              append-icon="fas fa-cogs fa-lg"
              md-input-name="model"
              md-input-minlength="3"
              md-input-maxlength="50"
              md-no-cache="true"
      md-search-text-change="ctrl.machineryService.userInputCallback(ctrl.machineryService.model.nazwa)"
              md-selected-item="ctrl.machineryService.selectedItem"
              md-selected-item-change="ctrl.machineryService.selectExisting(ctrl.machineryService.selectedItem)"
              md-search-text="ctrl.machineryService.model.nazwa"
              md-items="item in ctrl.machineryService.querySearch(ctrl.machineryService.model.nazwa)"
              md-item-text="item.display"
              md-min-length="0"
              md-clear-button="false"
              md-floating-label="Model">
              <md-item-template>
                <span md-highlight-text="ctrl.machineryService.searchText">{{item.display}}</span>
              </md-item-template>
              <div ng-messages="przyjecieSpawarki.model.$error" ng-if="przyjecieSpawarki.model.$touched">
                <div ng-message="required">Nie leć w kulki ino wpisuj!</div>
                <div ng-message-exp="['minlength', 'maxlength']">Rób tak cobyś wklepoł między 3 a 50 znaków</div>
              </div>
            </md-autocomplete>

            <!-- <md-input-container class="md-block" flex-gt-sm>
              <label>Model</label>
              <md-icon md-font-icon="fas fa-cog fa-lg"></md-icon>
              <input ng-model="ctrl.urzadzenie.model">
            </md-input-container> -->

            <md-input-container class="md-block" flex-gt-sm>
              <label>Nr seryjny</label>
              <md-icon md-font-icon="fas fa-pen fa-lg"></md-icon>
              <input ng-model="ctrl.urzadzenie.numerSeryjny">
            </md-input-container>

          </md-card-content>

          <md-card-actions layout="row">

            <md-card flex="">
              <md-card-content>
                <p>Typ urządzenia:</p>
                <div layout="row" layout-sm="column">
                  <md-checkbox flex="20" ng-model="ctrl.machineryService.model.typ.mig">MIG</md-checkbox>
                  <md-checkbox flex="20" ng-model="ctrl.machineryService.model.typ.tig">TIG</md-checkbox>
                  <md-checkbox flex="20" ng-model="ctrl.machineryService.model.typ.mma">MMA</md-checkbox>
                  <md-checkbox flex="20" ng-model="ctrl.machineryService.model.typ.plasma">Plasma</md-checkbox>
                  <md-checkbox flex="20" ng-model="ctrl.machineryService.model.typ.inne">Inne</md-checkbox>
                </div>
              </md-card-content>
            </md-card>

            <md-card flex="">
              <md-card-content>
                <p>Wyposażenie:</p>
                <!-- <md-button ng-click="ctrl.urzadzenie.maUchwyt = !ctrl.urzadzenie.maUchwyt">
                  <md-icon md-font-icon="fa-lg" ng-class="ctrl.urzadzenie.maUchwyt ? 'fas fa-check-square' : 'far fa-square'" ></md-icon>Uchwyt
                </md-button> -->
                <div layout="row" layout-sm="column">
                  <md-checkbox flex="20" ng-model="ctrl.urzadzenie.maUchwyt">Uchwyt</md-checkbox>
                  <md-checkbox flex="20" ng-model="ctrl.urzadzenie.maUchwytMasowy">Uchwyt masowy</md-checkbox>
                  <md-checkbox flex="20" ng-model="ctrl.urzadzenie.maAdaptor">Adaptor</md-checkbox>
                  <md-checkbox flex="20" ng-model="ctrl.urzadzenie.maDrut">Drut</md-checkbox>
                  <md-checkbox flex="20" ng-model="ctrl.urzadzenie.maReduktor">Reduktor</md-checkbox>
                </div>
              </md-card-content>
            </md-card>
          </md-card-actions>
        </md-card>


        <md-card>
          <md-card-header>
            <md-card-header-text>
              <span class="md-title">Co z tym robimy</span>
            </md-card-header-text>
          </md-card-header>
          <md-card-content layout="column">

            <div layout="row">
              <md-input-container class="md-block" flex="33">
                <md-switch class="md-primary" ng-model="ctrl.urzadzenie.doWyceny">Najpierw wycena</md-switch>
              </md-input-container>

              <md-input-container class="md-block" flex="33">
                <label ng-disabled="!ctrl.urzadzenie.doWyceny">Przewidywany termin wyceny</label>
                <md-datepicker ng-disabled="!ctrl.urzadzenie.doWyceny" ng-model="ctrl.urzadzenie.przewidywanyTerminWyceny"></md-datepicker>
              </md-input-container>

              <md-input-container class="md-block" flex="33">
                <label ng-disabled="ctrl.urzadzenie.doWyceny">Przewidywany termin naprawy</label>
                <md-datepicker ng-disabled="ctrl.urzadzenie.doWyceny" ng-model="ctrl.urzadzenie.przewidywanyTerminNaprawy"></md-datepicker>
              </md-input-container>
            </div>

            <div>
              <md-input-container class="md-block">
                <label>Dodatkowe informacje</label>
                <!-- <md-icon md-font-icon="far fa-edit fa-lg"></md-icon> -->
                <textarea ng-model="ctrl.urzadzenie.dodatkoweInfo" md-maxlength="500" rows="5" md-select-on-focus=""></textarea>
              </md-input-container>
            </div>

            <div layout="row" layout-align="space-around center">
              <md-input-container class="md-block">
                <label>Data przyjęcia</label>
                <md-datepicker ng-model="ctrl.urzadzenie.dataPrzyjecia"></md-datepicker>
              </md-input-container>

              <div>
                <md-button class="md-raised md-primary" type="submit">Przyjęto na serwis</md-button>
              </div>
            </div>

          </md-card-content>
        </md-card>

      </form>
    </div>
  </md-content>
</div>

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
  <script src="/app/PrzyjecieSpawarkiCtrl.js"></script>

  </body>
</html>