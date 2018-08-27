/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
rsApp.controller('StanyWarsztatuCtrl', function StanyWarsztatuCtrl(NgTableParams, repairsWarehouseService) {
    var vm = this;
    
    vm.FilterQuery = "";
    vm.resetFilters = resetFilters;
    function resetFilters() {
        vm.FilterQuery = "";
    }
    
    vm.tableData = [];
    vm.tableParams = new NgTableParams({}, { dataset: vm.tableData});

    vm.dataLoader = repairsWarehouseService.loadAll(vm.FilterQuery).then(function(result){
        vm.tableData = result;
        vm.tableParams = new NgTableParams({}, { dataset: vm.tableData});
    });

    vm.startValuation = startValuation;
    function startValuation(itemId){
        console.log("Wycena urzadzenia: ", itemId);
    }
    // vm.dtOptions = DTOptionsBuilder
    //     .fromFnPromise(vm.dataLoader)
    //     .withPaginationType('full_numbers');

    // vm.dtColumns = [
    //     DTColumnBuilder.newColumn('dataPrzyjecia').withTitle('Data'),
    //     DTColumnBuilder.newColumn('numerPrzyjecia.value').withTitle('Data'),
    //     // DTColumnBuilder.newColumn(null).withTitle('Numer').renderWith(function(data, type, full) {
    //     //     return data.numerPrzyjecia.count + "/" + data.numerPrzyjecia.month + "/" + data.numerPrzyjecia.year;
    //     // }),
    //     DTColumnBuilder.newColumn('Klient.nazwaFirmy').withTitle('Nazwa firmy'),
    //     DTColumnBuilder.newColumn('Urzadzenie.Producent.nazwaFirmy').withTitle('Producent'),
    //     DTColumnBuilder.newColumn('Urzadzenie.nazwa').withTitle('Model'),
    //     DTColumnBuilder.newColumn('numerSeryjny').withTitle('Nr seryjny')
    // ];
    // vm.dtInstance = {};

});
