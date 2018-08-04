/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
/********************/
/* Obsluga Urzadzen */
/********************/
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
