/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/

/*******************/
/* Zmienne         */
/*******************/
class PersistentVarsService {
    constructor($q, esClient) {
        this.$q           = $q;
        this.esClient     = esClient;
        this.ES_IndexName = ES_Details.PersistentVarsIndex;

        this.repairsIndex = null;
        this.getNextRepairsIndex();
        console.log("Nowy PersistentVarsService");
    }

    // obsluga roztomaitych eventow
    storeVar(varName, varData) {
        // console.log("Zapisuja ["+varName+"] w ES:", varData);
        var defer = this.$q.defer();
        this.esClient.index({
            index: this.ES_IndexName,
            type: 'main',
            id: varName,
            body: varData
        }).then(function (resp) {
            // console.log("Zapisolch ["+varName+"] w ES:", resp);
            defer.resolve(true);
        }, function (err) {
            alert("Olaboga tąpneło!", err.message);
            console.trace(err.message);
            defer.resolve(false);
        });
        return defer.promise;
    }

    getVar(varName){
        var defer = this.$q.defer();
        var vm = this;
        this.esClient.get({
            index: this.ES_IndexName,
            type: 'main',
            id: varName
        })
        .then(function(result) {
            // console.log("Var ["+varName+"] value", result);
            defer.resolve(result._source);
        }, function (err) {
            if(err.message == "Not Found"){
                console.log("Var ["+varName+"] is not present yet, returning null");
                defer.resolve(null);
            } else {
                console.log("Olaboga tąpneło!", err.message);
            }
        });
        return defer.promise;
    }

    getNextRepairsIndex(){
        var vm = this;
        vm.getVar("repairsIndex").then(function(result) {
            var index = result;
            var d = new Date();
            var m = d.getMonth();
            var y = d.getFullYear();
            if(index == null){
                index = {};
                index.count = 1;
                index.month = m;
                index.year  = y;
                // console.log("repairsIndex initialised");
            } else {
                if( index.month == m ){
                    index.count++;
                    // console.log("repairsIndex for month ["+m+"] incremented");
                } else {
                    index.count = 1;
                    index.month = m;
                    index.year  = y;
                    // console.log("repairsIndex for month ["+m+"] initialised");
                }
            }
            index.value = index.count + "/" + index.month + "/" + index.year;
            console.log("repairsIndex:", index);
            vm.repairsIndex = index;
        });
    }
    setRepairsIndex(){
        var vm = this;
        vm.storeVar("repairsIndex", this.repairsIndex)
            .then(function(){
                vm.getNextRepairsIndex();
            });
    }
}
