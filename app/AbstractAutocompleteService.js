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
        this.model         = _.cloneDeep(item.data);
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
        // console.log("Has Changes:",this.model, this.cleanItemCopy.data);
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
