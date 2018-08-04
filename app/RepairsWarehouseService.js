/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
class RepairsWarehouseService {
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
    
    loadAll(filterQuery) {
        var esQuery = '';
        if( filterQuery != "" ){
            esQuery = filterQuery;
        }
        var defer = this.$q.defer();
        this.esClient.search({
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

    add(newElementData) {
        console.log("Wysylom Spawarka do ES:", newElementData);
        var defer = this.$q.defer();
        this.esClient.index({
            index: ES_Details.NaprawaSpawarekIndex,
            type: 'main',
            id: null,
            body: newElementData
        }).then(function (resp) {
            console.log("Spawarka wyslano do ES:", resp);
            alert("Fertich!");
        }, function (err) {
            alert("Olaboga tąpneło!", err.message);
            console.trace(err.message);
        });
        return defer.promise;
    }
}
