// Needs CommonFunction.js to work
/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/

var ES_Details = {};
//ES_Details.User = "elasticsearch";
//ES_Details.Password = "elasticsearch";
ES_Details.Url = 'http://192.168.0.60:9200/';
ES_Details.Index = 'remspaw_dev';
ES_Details.Type = 'naprawa_spawarek';


// var rsApp = angular.module('RemSpawApp', ['datatables', 'datatables.bootstrap', 'ngResource', 'ngMaterial', 'elasticsearch']);
var rsApp = angular.module('RemSpawApp', ['datatables', 'datatables.bootstrap', 'elasticsearch']);

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
        MainController : {},
    };
});

/*---~~+=============================================================================================+~~---*/
rsApp.controller('MainController', function MainController(rsAppState, esClient) {
    var vm = this;
    rsAppState.MainController = vm;

    vm.urzadzenie = nowaSpawarka();

    vm.potwierdzPrzyjecie = potwierdzPrzyjecie;
    function potwierdzPrzyjecie() {
        console.log("Wysylam do ES:", vm.urzadzenie);

        esClient.index({
            index: ES_Details.Index,
            type: ES_Details.Type,
            id: null,
            body: vm.urzadzenie
        }).then(function (resp) {
            console.log("ES:", resp);
        }, function (err) {
            console.trace(err.message);
        });
    }
});

/*---~~+=============================================================================================+~~---*/
rsApp.controller('StanySerwisuCtrl', function StanySerwisuCtrl(rsAppState, esClient, DTOptionsBuilder, DTColumnBuilder, $q) {
    var vm = this;

    vm.FilterQuery = "";
    vm.resetFilters = resetFilters;
    function resetFilters() {
        vm.FilterQuery = "";
    }

    vm.dtOptions = DTOptionsBuilder
        .fromFnPromise(dataLoader)
        .withPaginationType('full_numbers');

    vm.dataLoader = dataLoader;
    function dataLoader() {
        var esQuery = '';
        if( vm.FilterQuery != "" ){
            esQuery += ' AND ' + vm.FilterQuery;
        }
        var defer = $q.defer();
        esClient.search({
            index: ES_Details.Index,
            type: ES_Details.Type,
            size: 10000,
            // body: getQueryBody(esQuery, '')
            // body: getQueryBody(esQuery, trAppState.MainController.TimeRange)
        })
        .then(function(result) {
            console.log("Result:",result);
            defer.resolve(result.hits.hits);
        });
        return defer.promise;
    }

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

    obj.dataPrzyjecia = new Date();
    // dane klienta
    obj.nazwaFirmy = "Egon i spolka";
    obj.telefon = "12315344";
    obj.email = "egon@egonispolka.pl";
    // dane spawarki
    obj.producent = "ESAB";
    obj.model = "Tigomatic-2000";
    obj.numerSeryjny = "123ABC";
    // wyposazenie
    obj.maUchwyt = false;
    obj.maUchwytMasowy = false;
    obj.maAdaptor = false;
    obj.maDrut = false;
    obj.maReduktor = false;
    obj.maInne = "Nie mo inkszych";

    // wewnetrzne
    obj.doRozpoznania = true;
    obj.doNaprawy = false;

    return obj;
  }