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
/* Filters */       
/*---~~+=============================================================================================+~~---*/
rsApp.filter('orderByKey', function() {
    return function(items, reversal) {
        var normalKeys = [];
        var objectKeys = [];
        angular.forEach(items, function(value, key) {
            if( angular.isObject(value) ){
                objectKeys.push(key);
            } else {
                normalKeys.push(key)
            }
        });
        var sortedKeys = normalKeys.sort();
        if( reversal ) sortedKeys.reverse();
        var sortedObjectKeys = objectKeys.sort();
        if( reversal ) sortedObjectKeys.reverse();
        sortedKeys = sortedKeys.concat(sortedObjectKeys);
        return sortedKeys;
    };
});

rsApp.filter('orderByKeyB', function() {
    return function(items, reversal) {
        var boolKeys = [];
        var normalKeys = [];
        var objectKeys = [];
        angular.forEach(items, function(value, key) {
            if( angular.isObject(value) ){
                objectKeys.push(key);
            } else if (typeof value == "boolean") {
                boolKeys.push(key);
            } else {
                normalKeys.push(key);
            }
        });
        var sortedKeys = normalKeys.sort();
        if( reversal ) sortedKeys.reverse();
        var sortedBoolKeys = boolKeys.sort();
        if( reversal ) sortedBoolKeys.reverse();
        sortedKeys = sortedBoolKeys.concat(sortedKeys);
        var sortedObjectKeys = objectKeys.sort();
        if( reversal ) sortedObjectKeys.reverse();
        sortedKeys = sortedKeys.concat(sortedObjectKeys);
        return sortedKeys;
    };
});

rsApp.filter('prettyName', function () {
    return function (input) {
        var string = input.replace("_", " ");
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
});

// REQUIRES:
// moment.js - http://momentjs.com/

// USAGE:
// {{ someDate | moment: [any moment function] : [param1] : [param2] : [param n] 

// EXAMPLES:
// {{ someDate | moment: 'format': 'MMM DD, YYYY' }}
// {{ someDate | moment: 'fromNow' }}

// To call multiple moment functions, you can chain them.
// For example, this converts to UTC and then formats...
// {{ someDate | moment: 'utc' | moment: 'format': 'MMM DD, YYYY' }}
rsApp.filter('moment', function () {
    return function (input, momentFn /*, param1, param2, ...param n */) {
        var args = Array.prototype.slice.call(arguments, 2),
            momentObj = moment(input);
        return momentObj[momentFn].apply(momentObj, args);
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
