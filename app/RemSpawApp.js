/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/

// var rsApp = angular.module('RemSpawApp', ['datatables', 'datatables.bootstrap', 'ngResource', 'ngMaterial', 'elasticsearch']);
// var rsApp = angular.module('RemSpawApp', ['datatables', 'datatables.bootstrap', 'elasticsearch', 'ngMaterial', 'ngMessages', 'ngTable']);
var rsApp = angular.module('RemSpawApp', ['elasticsearch', 'ngMaterial', 'ngMessages', 'ngTable']);

// State manager - used when controller want to access other controllers
rsApp.factory('rsAppState', function() {
    return {
        PrzyjecieSpawarkiCtrl : {},
    };
});

/*---~~+=============================================================================================+~~---*/

rsApp.service('customerService', CustomerService);
rsApp.service('manufacturerService', ManufacturerService);
rsApp.service('machineryService', MachineryService);
rsApp.service('repairsWarehouseService', RepairsWarehouseService);
rsApp.service('persistentVarsService', PersistentVarsService);

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

/*---~~+=============================================================================================+~~---*/
/* Magia z netu */
rsApp.directive('appendIcon', appendIcon);
/**
 * Adds icon to md-autocomplete boxes.
 * @param {*} $timeout 
 * @param {*} $compile 
 */
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

/*---~~+=============================================================================================+~~---*/
/* Utility functions 
/*---~~+=============================================================================================+~~---*/
/**
 * Builds the 'body' section of ES query call based on given Parameters.
 * @param {String} esQuery Lucene query
 * @param {String} esTimeRange Compatible ES time range
 */
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
