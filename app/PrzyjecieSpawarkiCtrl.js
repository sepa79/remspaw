/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
rsApp.controller('PrzyjecieSpawarkiCtrl', function PrzyjecieSpawarkiCtrl(rsAppState, customerService, manufacturerService, machineryService,
    repairsWarehouseService, persistentVarsService) {
    var vm = this;
    rsAppState.PrzyjecieSpawarkiCtrl = vm;
    vm.formStatus = "";

    // nowy pusty obiekt na dane spawarki
    vm.urzadzenie = new Urzadzenie();
    
    // przycisk 'przyjecie' mo byc nieaktywny zanim sie wszystko nie wpusze poprawnie
    vm.isAddButtonDisabled = isAddButtonDisabled;
    function isAddButtonDisabled(formElement){
        if( vm.customerService.cleanItemCopy.esId == null ){
            vm.formStatus = "Nie wybrano klienta";
            return true;
        }
        if( vm.machineryService.cleanItemCopy.esId == null ){
            vm.formStatus = "Nie wybrano urządzenia";
            return true;
        }
        vm.formStatus = "Przyjęcie na serwis";
        return false;
    }
    // przyjecie spawarki - obsluga przycisku
    vm.confirmReceipt = 
    function confirmReceipt(goods) {
        console.log("Dane przyjecia przed liftingiem:", goods);
        // pomaglowac trza troche zanim sie wysle - wrzucic customer ID, manufacturer ID, type ID
        vm.urzadzenie.idKlienta      = vm.customerService.cleanItemCopy.esId;
        vm.urzadzenie.idModelu       = vm.machineryService.cleanItemCopy.esId;
        vm.urzadzenie.numerPrzyjecia = persistentVarsService.repairsIndex.value;
        vm.urzadzenie.przyjecieNaStan();
        repairsWarehouseService.add(vm.urzadzenie);
        
        // czyscimy formularze etc
        persistentVarsService.setRepairsIndex();
        vm.urzadzenie = new Urzadzenie();
        vm.initMachineForm();
        vm.customerService.init();
    }
    // podpinamy obsluge klientow i urzadzen
    vm.customerService     = customerService;
    vm.manufacturerService = manufacturerService;
    vm.machineryService    = machineryService;

    vm.isMachineFormUpdateButtonDisabled = isMachineFormUpdateButtonDisabled;
    function isMachineFormUpdateButtonDisabled(formElement){
        return vm.manufacturerService.isUpdateButtonDisabled(formElement) && vm.machineryService.isUpdateButtonDisabled(formElement);
    }
    vm.isMachineFormResetButtonDisabled = isMachineFormResetButtonDisabled;
    function isMachineFormResetButtonDisabled(formElement){
        return vm.manufacturerService.isResetButtonDisabled(formElement) && vm.machineryService.isResetButtonDisabled(formElement);
    }
    vm.addManufacturer = addManufacturer;
    function addManufacturer(){
        vm.manufacturerService.add().then(function(esId){
            vm.machineryService.init(esId);
        });
    }
    vm.initMachineForm = initMachineForm;
    function initMachineForm(){
        vm.manufacturerService.init();
        vm.machineryService.init();
    }
    vm.updateMachineForm = updateMachineForm;
    function updateMachineForm(formElement){
        // TODO update musi sprawdzac, czy mozna i czy trzeba...
            if(!vm.manufacturerService.isUpdateButtonDisabled(formElement)) {
                vm.manufacturerService.update();
            }
            if(!vm.machineryService.isUpdateButtonDisabled(formElement)) {
                vm.machineryService.update();
            }
        }
    // Proxy method - when selecting Manufacturer we have to reload the Machinery
    vm.selectManufacturer = selectManufacturer;
    function selectManufacturer(item){
        vm.manufacturerService.selectExisting(item);
        if(item!=null){
            console.log("Mom zaladowac spawarki dla:", item.esId);
            vm.machineryService.init(item.esId);
        }
    }

});

/*---~~+=============================================================================================+~~---*/
