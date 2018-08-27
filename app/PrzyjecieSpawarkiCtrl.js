/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
rsApp.controller('PrzyjecieSpawarkiCtrl', function PrzyjecieSpawarkiCtrl(rsAppState, customerService, manufacturerService, machineryService, repairsWarehouseService) {
    var vm = this;
    rsAppState.PrzyjecieSpawarkiCtrl = vm;
    vm.formStatus = "";

    // nowy pusty obiekt na dane spawarki
    vm.urzadzenie = nowaSpawarka();

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
        console.log("Do ES:", goods);
        // pomaglowac trza troche zanim sie wysle - wrzucic customer ID, manufacturer ID, type ID
        goods.idKlienta = vm.customerService.cleanItemCopy.esId;
        goods.idModelu = vm.machineryService.cleanItemCopy.esId;
        repairsWarehouseService.add(goods);
        vm.urzadzenie = nowaSpawarka();
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
    // Proxy method - when selecting Manufacturerwe have to reload the Machinery
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
function nowaSpawarka() {
    var obj = {};

    obj.numerPrzyjecia = "1/06/2018"; // dolozyc tabelke do ES na zmienne tego typu
    obj.dataPrzyjecia = new Date();
    // dane klienta
    obj.idKlienta = null;
    // dane spawarki
    obj.idModelu = null;
    obj.numerSeryjny = null;

    // urzadzenia dodatkowe
    // obj.chlodnica = {};
    // obj.chlodnica.jest = false;
    // obj.chlodnica.producent = "";
    // obj.chlodnica.model = "";
    // obj.chlodnica.numerSeryjny = "";
    // obj.podajnik = {};
    // obj.podajnik.jest = false;
    // obj.podajnik.producent = "";
    // obj.podajnik.model = "";
    // obj.podajnik.numerSeryjny = "";

    // wyposazenie
    obj.Wyposazenie = {};
    obj.Wyposazenie.maUchwyt = false;
    obj.Wyposazenie.maUchwytMasowy = false;
    obj.Wyposazenie.maAdaptor = false;
    obj.Wyposazenie.maDrut = false;
    obj.Wyposazenie.maReduktor = false;
    obj.Wyposazenie.maInne = null;
    obj.Wyposazenie.dodatkowe = null;

    // wewnetrzne
    obj.doWyceny= true;
    obj.doNaprawy = false;
    obj.dodatkoweInfo = null;

    var now = new Date();
    now.setDate(now.getDate()+14);
    obj.przewidywanyTerminWyceny  = now; 
    obj.przewidywanyTerminNaprawy = now; 
    
    return obj;
}
