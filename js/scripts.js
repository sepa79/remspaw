// Needs CommonFunction.js to work
/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
var ES_Details = {};
//ES_Details.User = "elasticsearch";
//ES_Details.Password = "elasticsearch";
ES_Details.Url = 'http://192.168.1.60:9200/';
ES_Details.NaprawaSpawarekIndex = 'naprawa_spawarek';
ES_Details.CustomersIndex = 'dane_klientow';
ES_Details.ManufacturerIndex = 'producenci';
ES_Details.MachineryIndex = 'urzadzenia';


// var rsApp = angular.module('RemSpawApp', ['datatables', 'datatables.bootstrap', 'ngResource', 'ngMaterial', 'elasticsearch']);
var rsApp = angular.module('RemSpawApp', ['datatables', 'datatables.bootstrap', 'elasticsearch', 'ngMaterial', 'ngMessages']);

// main query body
function getQueryBody(esQuery, esTimeRange){
    console.log("Building query. Timerange is: ", esTimeRange, "Query is: ", esQuery);

    return {
        query: {
            bool: {
                must: {
                    query_string: {
                        query: esQuery
                    }
                // },
                // filter: {
                //     range: {
                //         'EventTimes.TestInit':{
                //             gte : esTimeRange
                //         }
                //     }
                }
            }
        }
    }
}

/*---~~+=============================================================================================+~~---*/
rsApp.service('esClient', function(esFactory) {
    // console.log("in listTestReports client");
    return esFactory({
        host: ES_Details.Url,
        //httpAuth: ES_Details.User + ":" + ES_Details.Password,
        apiVersion: '6.2',
        // sniffOnStart: true,
        log: 'trace'
      });
});

rsApp.factory('rsAppState', function() {
    return {
        PrzyjecieSpawarkiCtrl : {},
    };
});

rsApp.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

});

rsApp.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('DD/MM/YYYY');
    };
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
});

rsApp.service('repairsWarehouseService', function($q, esClient) {
    this.loadAll = function(filterQuery){
        var esQuery = '';
        if( filterQuery != "" ){
            esQuery = filterQuery;
        }
        var defer = $q.defer();
        esClient.search({
            index: ES_Details.NaprawaSpawarekIndex,
            type: 'main',
            size: 10000,
            // body: getQueryBody(esQuery, '')
            // body: getQueryBody(esQuery, trAppState.PrzyjecieSpawarkiCtrl.TimeRange)
        })
        .then(function(result) {
            console.log("Result:",result);
            defer.resolve(result.hits.hits);
        });
        return defer.promise;
    }

    this.add = function(newElementData){
        console.log("Wysylom Spawarka do ES:", newElementData);
        return;
        var defer = $q.defer();
        esClient.index({
            index: ES_Details.NaprawaSpawarekIndex,
            type: 'main',
            id: null,
            body: newElementData
        }).then(function (resp) {
            console.log("Geszyft wyslany do ES:", resp);
            alert("Fertich!");
        }, function (err) {
            alert("Olaboga tąpneło!", err.message);
            console.trace(err.message);
        });
        return defer.promise;
    }
});

/*---~~+=============================================================================================+~~---*/
class AbstractAutocompleteService {
    /**
     * In your class make sure to call init() at the end of the constructor.
     * @param {*} $q 
     * @param {*} esClient 
     */
    constructor($q, esClient) {
        this.$q       = $q;
        this.esClient = esClient;
        // call Init in your extending class
        //this.init()
        // console.log("Robia nowy obiekt do obslugi Autocomplete");
    }
    
    /**
     * Extend this method and call it once yours is completed.
     * Make sure to set these in your class:
     * - this.model : Bound Object used in UI
     * - this.autocompleteField : Field from model to use for autocomplete
     */
    init() {
        // console.log("Reset w AbstractAutocompleteService");
        // Used by md-autocomplete, code here and forms
        this.autocompleteList = [];
        this.selectedItem     = null;
        this.isNew            = true;
        this.cleanItemCopy    = {data: {}};
        this.populateAutocompleteList();
    }

    userInputCallback(searchText) {
        // console.log("Wklepano cos:", searchText, this.isNew);
    }

    selectExisting(item) {
        if(item == null) return;
        console.log("Wybrano:", item);
        this.model = _.cloneDeep(item.data);
        this.isNew         = false;
        this.cleanItemCopy = item;
    }

    add(){
        // console.log("Mom dodac:", this.model, this.cleanItemCopy);
        this.isNew = false;
        return this.addOrUpdate(this.model);
    }

    update(){
        // console.log("Mom uaktualnic:", this.model, this.cleanItemCopy);
        return this.addOrUpdate(this.model, this.cleanItemCopy.esId);
    }

    hasChanges() {
        console.log("Has Changes:",this.model, this.cleanItemCopy.data);
        return !_.isEqual(this.model, this.cleanItemCopy.data);
    }

    hasErrors(formElement) {
        alert("This need to be implemented in your child class!")
    }
    isAddButtonDisabled(formElement) {
        return this.isNew ? this.hasErrors(formElement) : true;
    }
    isUpdateButtonDisabled(formElement){
        return this.cleanItemCopy.esId!=null ? !(this.hasChanges() && !this.hasErrors(formElement)) : true;
    }
    isResetButtonDisabled(formElement){
        return !this.hasChanges() && this.isNew;
    }
    /**
     * Autocomplete - sznupajka.
     */
    querySearch(query) {
        var results = query ? this.autocompleteList.filter( this.createFilterFor(query) ) : this.autocompleteList;
        return results;
    }

    /**
     * Create filter function for a query string
     */
    createFilterFor(query) {
        var lowercaseQuery = query.toLowerCase();
        
        return function filterFn(queryString) {
            return (queryString.value.indexOf(lowercaseQuery) === 0);
        };
        
    }

    /**
     * Load list of items for Autocomplete
     */
    populateAutocompleteList() {
        var vm = this;
        this.loadAll().then(function (resp) {
            // console.log("Co my sam momy teroz:", resp);
            vm.autocompleteList = resp.map( function (item) {
                return {
                    value:   item._source[vm.autocompleteField].toLowerCase(), // na male literki do autocomplete
                    display: item._source[vm.autocompleteField],               // do wyswietlenia
                    data:    item._source,                                       // wlasciwe dane
                    esId:    item._id                                            // id z Elasticsearch - potrzebne do zrobienia update
                };
            });
        });
    }

    /**
     * Load all elements for Autocomplete function.
     */
    loadAll(){
        var defer = this.$q.defer();
        var vm = this;
        this.esClient.search({
            index: this.ES_IndexName,
            type: 'main',
            size: 1000, // That better be enough ;) If not, you need different autocomplete function anyhow
        })
        .then(function(result) {
            console.log(vm.constructor.name + " loadAll loader result:", result);
            defer.resolve(result.hits.hits);
        });
        return defer.promise;
    }

    /**
     * Dodaj/uaktualnij element w indeksie
     * @param {*} elementData 
     * @param {*} esId Opcjonalny, jesli jest to zrobimy update
     */
    addOrUpdate(elementData, esId){
        var vm = this;
        console.log("Wysylom do ES:", elementData);
        // cokolwiek sie dzieje - sklonuj obiekt coby sie dalo wykryc zmiany i uaktualnij na liscie do autocomplete
        // jesli to nowy obiekt to go dodaj do listy
        if(esId == null){
            vm.cleanItemCopy.data = {};
            vm.autocompleteList.push(vm.cleanItemCopy);
        }
        vm.cleanItemCopy.value   = elementData[this.autocompleteField].toLowerCase();
        vm.cleanItemCopy.display = elementData[this.autocompleteField];
        // kopia danych i voila
        vm.cleanItemCopy.data = _.cloneDeep(elementData);
        // zapisz w ES
        var defer = this.$q.defer();
        this.esClient.index({
            index: this.ES_IndexName,
            type: 'main',
            id: esId,
            body: elementData
        }).then(function (resp) {
            console.log("Wyslano do ES, odpowiedz:", resp);
            // przeladuj liste do autocomplete, ustaw esId coby sie dalo zrobic update
            vm.cleanItemCopy.esId = resp._id;
            defer.resolve(resp._id);
        }, function (err) {
            alert("Olaboga tąpneło!", err.message);
            console.trace(err.message);
        });
        return defer.promise;
    }
}

/*******************/
/* Obsluga Klienta */
/*******************/
class CustomerService extends AbstractAutocompleteService {
    constructor($q, esClient) {
        super($q, esClient);
        this.ES_IndexName = ES_Details.CustomersIndex;
        this.init();
        console.log("Nowy klient service", this.customer);
    }

    // obsluga roztomaitych eventow
    init() {
        console.log("Reset w CustomerService");
        this.customer            = {};
        this.customer.nazwaFirmy = null;
        this.customer.telefon    = null;
        this.customer.email      = null;
        // assign our data to model so that autocomplete can display it etc.
        this.model               = this.customer;
        // select the field used for autocomplete
        this.autocompleteField   = "nazwaFirmy";
        // call parent init
        super.init();
    }

    // sprawdzenie formularza - trza to robic z palca bo nazwy pol sie zmieniaja w kazdym formularzu. No chyba, ze kiedys napisza jakis magiczny loop.
    hasErrors(formElement) {
        // magiczny check coby nie bylo bledow w trakcie ladowania strony (ng-cloak cos nie daje rady)
        if( formElement.nazwaFirmy == null || formElement.email == null ) return true;
        return (Object.keys(formElement.nazwaFirmy.$error).length + Object.keys(formElement.email.$error).length) > 0;
    }
}
/********************/
/* Obsluga Urzadzen */
/********************/
class ManufacturerService extends AbstractAutocompleteService {
    constructor($q, esClient) {
        super($q, esClient);
        this.ES_IndexName = ES_Details.ManufacturerIndex;
        this.init();
        console.log("Nowy ManufacturerService");
    }

    // obsluga roztomaitych eventow
    init() {
        this.manufacturer            = {};
        this.manufacturer.nazwaFirmy = null;
        // assign our data to model so that autocomplete can display it etc.
        this.model               = this.manufacturer;
        // select the field used for autocomplete
        this.autocompleteField   = "nazwaFirmy";
        // call parent init
        super.init();
    }

    // Sprawdzenie formularza - trza to robic z palca bo nazwy pol sie zmieniaja w kazdym formularzu.
    // No chyba, ze kiedys napisza jakis magiczny loop, albo jak autocomplete bedzie dla pojedynczego formularza, bo terozki sa 3 rozne jako 1.
    hasErrors(formElement) {
        // console.log(formElement);
        // magiczny check coby nie bylo bledow w trakcie ladowania strony (ng-cloak cos nie daje rady)
        if( formElement.producent == null ) return true;
        return Object.keys(formElement.producent.$error).length > 0;
    }

}

class MachineryService extends AbstractAutocompleteService {
    constructor($q, esClient) {
        super($q, esClient);
        this.ES_IndexName = ES_Details.MachineryIndex;
        this.init();
        console.log("Nowy MachineryService");
    }

    // obsluga roztomaitych eventow
    /**
     * Reset & load items that match supplied esId
     * @param {*} esId 
     */
    init(esId) {
        this.manufacturerId       = esId;
        this.machinery            = {};
        this.machinery.producent  = esId;
        this.machinery.nazwa      = null;
        this.machinery.typ        = {};
        this.machinery.typ.mig    = true;
        this.machinery.typ.tig    = false;
        this.machinery.typ.mma    = false;
        this.machinery.typ.plazma = false;
        this.machinery.typ.inne   = false;
    
        // assign our data to model so that autocomplete can display it etc.
        this.model                = this.machinery;
        // select the field used for autocomplete
        this.autocompleteField    = "nazwa";
        // call parent init
        super.init();
    }

    /**
     * Load all elements for Autocomplete function. Overrided so that it can query by ManufacturerId.
     */
    loadAll(){
        // bail if the manufacturer has not been selected
        if(this.manufacturerId == null){
            return Promise.resolve([]);
        }
        var defer = this.$q.defer();
        var vm = this;
        this.esClient.search({
            index: this.ES_IndexName,
            type: 'main',
            size: 1000, // That better be enough ;) If not, you need different autocomplete function anyhow
            body: getQueryBody('producent:"'+this.manufacturerId+'"', '')
        })
        .then(function(result) {
            console.log(vm.constructor.name + " loadAll loader result:", result);
            defer.resolve(result.hits.hits);
        });
        return defer.promise;
    }
    // Sprawdzenie formularza - trza to robic z palca bo nazwy pol sie zmieniaja w kazdym formularzu.
    // No chyba, ze kiedys napisza jakis magiczny loop, albo jak autocomplete bedzie dla pojedynczego formularza, bo terozki sa 3 rozne jako 1.
    hasErrors(formElement) {
        // console.log(formElement);
        // magiczny check coby nie bylo bledow w trakcie ladowania strony (ng-cloak cos nie daje rady)
        if( formElement.model == null ) return true;
        return Object.keys(formElement.model.$error).length > 0;
    }
}

rsApp.service('customerService', CustomerService);
rsApp.service('manufacturerService', ManufacturerService);
rsApp.service('machineryService', MachineryService);

/*---~~+=============================================================================================+~~---*/
rsApp.controller('PrzyjecieSpawarkiCtrl', function PrzyjecieSpawarkiCtrl(rsAppState, customerService, manufacturerService, machineryService, repairsWarehouseService) {
    var vm = this;
    rsAppState.PrzyjecieSpawarkiCtrl = vm;

    // nowy pusty obiekt na dane spawarki
    vm.urzadzenie = nowaSpawarka();

    // przyjecie spawarki - obsluga przycisku
    vm.confirmReceipt = 
    function confirmReceipt(goods) {
        console.log("Do ES:", goods);
        // pomaglowac trza troche zanim sie wysle - wrzucic customer ID, manufacturer ID, type ID
        repairsWarehouseService.add(goods);    
    }
    // podpinamy obsluge klientow i urzadzen
    vm.customerService     = customerService;
    vm.manufacturerService = manufacturerService;
    vm.machineryService    = machineryService;

    vm.isMachineFormUpdateButtonDisabled = isMachineFormUpdateButtonDisabled;
    function isMachineFormUpdateButtonDisabled(formElement){
        return vm.manufacturerService.isUpdateButtonDisabled(formElement) && vm.machineryService.isUpdateButtonDisabled(formElement);
    }
    vm.isMachineFormResetButtonDisabled = isMachineFormResetButtonDisabled;
    function isMachineFormResetButtonDisabled(formElement){
        return vm.manufacturerService.isResetButtonDisabled(formElement) && vm.machineryService.isResetButtonDisabled(formElement);
    }
    vm.addManufacturer = addManufacturer;
    function addManufacturer(){
        vm.manufacturerService.add().then(function(esId){
            vm.machineryService.init(esId);
        });
    }
    vm.initMachineForm = initMachineForm;
    function initMachineForm(){
        vm.manufacturerService.init();
        vm.machineryService.init();
    }
    vm.updateMachineForm = updateMachineForm;
    function updateMachineForm(formElement){
        // TODO update musi sprawdzac, czy mozna i czy trzeba...
            if(!vm.manufacturerService.isUpdateButtonDisabled(formElement)) {
                vm.manufacturerService.update();
            }
            if(!vm.machineryService.isUpdateButtonDisabled(formElement)) {
                vm.machineryService.update();
            }
        }
    // Proxy method - when selecting Manufacturerwe have to reload the Machinery
    vm.selectManufacturer = selectManufacturer;
    function selectManufacturer(item){
        vm.manufacturerService.selectExisting(item);
        if(item!=null){
            console.log("Mom zaladowac spawarki dla:", item.esId);
            vm.machineryService.init(item.esId);
        }
    }
        // to musi byc tak:
        // kontroler musi miec 'isReady'
        // przycisk dodania modelu jest aktywny tylko gdy producent.isReady i mamy nowy model
        // Model mozna dodac tylko kiedy:
        // 1. Producent jest wybrany (nie jest nowy, nie ma zmian i nie ma bledow).
        // 2. Model jest nowy i nie ma bledow.
});

/*---~~+=============================================================================================+~~---*/
rsApp.controller('StanySerwisuCtrl', function StanySerwisuCtrl(DTOptionsBuilder, DTColumnBuilder, repairsWarehouseService) {
    var vm = this;
    
    vm.FilterQuery = "";
    vm.resetFilters = resetFilters;
    function resetFilters() {
        vm.FilterQuery = "";
    }
    
    vm.dataLoader = repairsWarehouseService.loadAll(vm.FilterQuery);
    vm.dtOptions = DTOptionsBuilder
        .fromFnPromise(vm.dataLoader)
        .withPaginationType('full_numbers');

    vm.dtColumns = [
        DTColumnBuilder.newColumn('_source.dataPrzyjecia').withTitle('Data'),
        DTColumnBuilder.newColumn('_source.nazwaFirmy').withTitle('Nazwa firmy'),
        DTColumnBuilder.newColumn('_source.producent').withTitle('Producent'),
        DTColumnBuilder.newColumn('_source.model').withTitle('Model'),
        DTColumnBuilder.newColumn('_source.numerSeryjny').withTitle('Nr seryjny')
    ];
    vm.dtInstance = {};

});

/*---~~+=============================================================================================+~~---*/
function nowaSpawarka() {
    var obj = {};

    obj.numerPrzyjecia = "1/06/2018"; // dolozyc tabelke do ES na zmienne tego typu
    obj.dataPrzyjecia = new Date();
    // dane klienta
    obj.nazwaFirmy = null;
    obj.telefon = null;
    obj.email = null;
    // dane spawarki
    obj.producent = null;
    obj.model = null;
    obj.numerSeryjny = null;

    // urzadzenia dodatkowe
    obj.chlodnica = {};
    obj.chlodnica.jest = false;
    obj.chlodnica.producent = "";
    obj.chlodnica.model = "";
    obj.chlodnica.numerSeryjny = "";
    obj.podajnik = {};
    obj.podajnik.jest = false;
    obj.podajnik.producent = "";
    obj.podajnik.model = "";
    obj.podajnik.numerSeryjny = "";

    // wyposazenie
    obj.maUchwyt = false;
    obj.maUchwytMasowy = false;
    obj.maAdaptor = false;
    obj.maDrut = false;
    obj.maReduktor = false;
    obj.maInne = null;

    // wewnetrzne
    obj.doWyceny= true;
    obj.doNaprawy = false;
    obj.dodatkoweInfo = null;

    var now = new Date();
    now.setDate(now.getDate()+14);
    obj.przewidywanyTerminWyceny  = now; 
    obj.przewidywanyTerminNaprawy = now; 
    
    return obj;
}

/*---~~+=============================================================================================+~~---*/
/* Magia z netu */
rsApp.directive('appendIcon', appendIcon);
function appendIcon($timeout, $compile) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var vm = this;
            $timeout(function () {
                var container = angular.element(elem[0].querySelector('md-input-container'));

                container.addClass('md-icon-left');
                var icon = $compile('<md-icon class="'+ attrs[vm.name] + '"</md-icon>')(scope);
                container.append(icon);
            });
        }
    };
};