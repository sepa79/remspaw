/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/

function RepairsWarehouseService($q, esClient) {
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
}
