/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
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
        // DTColumnBuilder.newColumn('_source.nazwaFirmy').withTitle('Nazwa firmy'),
        // DTColumnBuilder.newColumn('_source.producent').withTitle('Producent'),
        // DTColumnBuilder.newColumn('_source.model').withTitle('Model'),
        DTColumnBuilder.newColumn('_source.numerSeryjny').withTitle('Nr seryjny')
    ];
    vm.dtInstance = {};

});
