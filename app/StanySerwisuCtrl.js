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

});
