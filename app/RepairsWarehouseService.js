/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
class RepairsWarehouseService {
    /**
     * @param {*} $q 
     * @param {*} esClient 
     */
    constructor($q, esClient) {
        this.$q          = $q;
        this.esClient    = esClient;
        this.dataStore   = {};
        this.inWarehouse = [];
    }
    
    load(id){
        var defer = this.$q.defer();
        var vm = this;
        this.esClient.get({
            index: this.ES_IndexName,
            type: 'main',
            id: id
        })
        .then(function(result) {
            console.log(vm.constructor.name + " get loader result:", result);
            defer.resolve(result._source);
        });
        return defer.promise;
    }

    // tu trza zaladowac NaprawaSpawarekIndex, ManufacturerIndex, MachineryIndex i CustomersIndex
    loadAll(filterQuery) {
        var esQuery = '';
        if( filterQuery != "" ){
            esQuery = filterQuery;
        }
        var defer = this.$q.defer();
        var vm = this;
        this.esClient.msearch({
            body: [
                {
                    index: ES_Details.NaprawaSpawarekIndex,
                    type: 'main',
                    size: 10000
                },
                { query: { match_all: {} } },
                {
                    index: ES_Details.ManufacturerIndex,
                    type: 'main',
                    size: 10000
                },
                { query: { match_all: {} } },
                {
                    index: ES_Details.MachineryIndex,
                    type: 'main',
                    size: 10000
                },
                { query: { match_all: {} } },
                {
                    index: ES_Details.CustomersIndex,
                    type: 'main',
                    size: 10000
                },
                { query: { match_all: {} } }
            ]
        })
        .then(function(result) {
            console.log("Result:",result);
            // wszystko oprocz stanow idzie do jednego wora
            for (var i = 1; i < result.responses.length; i++) {
                var response = result.responses[i];
                response.hits.hits.forEach(hit => {
                    vm.dataStore[hit._id] = hit._source;
                });
            }
            // stany ida do osobnego wora
            result.responses[0].hits.hits.forEach(hit => {
                var hitData = hit._source;
                hitData.id = hit._id;
                hitData.Klient = vm.dataStore[hitData.idKlienta];
                hitData.Urzadzenie = vm.dataStore[hitData.idModelu];
                hitData.Urzadzenie.Producent = vm.dataStore[hitData.Urzadzenie.idProducenta];
                vm.inWarehouse.push(hitData);
            });

            console.log("Processed Result:",vm.dataStore);
            console.log("Processed Result:",vm.inWarehouse);
            defer.resolve(vm.inWarehouse);
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
