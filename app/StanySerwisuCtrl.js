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
        DTColumnBuilder.newColumn('dataPrzyjecia').withTitle('Data'),
        DTColumnBuilder.newColumn('Klient.nazwaFirmy').withTitle('Nazwa firmy'),
        DTColumnBuilder.newColumn('Urzadzenie.Producent.nazwaFirmy').withTitle('Producent'),
        DTColumnBuilder.newColumn('Urzadzenie.nazwa').withTitle('Model'),
        DTColumnBuilder.newColumn('numerSeryjny').withTitle('Nr seryjny')
    ];
    vm.dtInstance = {};

});
