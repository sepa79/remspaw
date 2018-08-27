/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
rsApp.controller('StanySerwisuCtrl', function StanySerwisuCtrl(NgTableParams, repairsWarehouseService) {
// rsApp.controller('StanySerwisuCtrl', function StanySerwisuCtrl(DTOptionsBuilder, DTColumnBuilder, repairsWarehouseService) {
    var vm = this;
    
    vm.FilterQuery = "";
    vm.resetFilters = resetFilters;
    function resetFilters() {
        vm.FilterQuery = "";
    }
    
    vm.tableData = [];
    vm.tableParams = new NgTableParams({}, {dataset: vm.tableData});

    vm.dataLoader = repairsWarehouseService.loadAll(vm.FilterQuery).then(function(result){
        vm.tableData = result;
        vm.tableParams = new NgTableParams({}, {dataset: vm.tableData});
    });

    // te klikaczki wyeca do osobnego kontrolera chyba
    vm.getActionName = getActionName;
    function getActionName(state){
        // console.log("getActionName: ", state);
        return RepairStates[state].actionName;
    }
    vm.getTooltip = getTooltip;
    function getTooltip(state){
        return RepairStates[state].description;
    }
    vm.getIcon = getIcon;
    function getIcon(state){
        return RepairStates[state].icon;
    }
    vm.getNextState = getNextState;
    function getNextState(state){
        return RepairStates[state].nextState;
    }
    vm.getNextWorkshopState = getNextWorkshopState;
    function getNextWorkshopState(state){
        return RepairStates[state].nextWorkshopState;
    }
    vm.getAbortState = getAbortState;
    function getAbortState(state){
        return RepairStates[state].abortState;
    }
    // przejdz do kolejnego stanu - wyswietl formularz do obslugi danego stanu
    vm.nextState = nextState;
    function nextState(row, state){
        console.log("nextState: ", row.id, state);
        var urzadzenie = Urzadzenie.create(row);
        urzadzenie.addStatus(RepairStates[state]);
        Object.assign(row, urzadzenie);
    }

    // vm.dataLoader = repairsWarehouseService.loadAll(vm.FilterQuery);
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
