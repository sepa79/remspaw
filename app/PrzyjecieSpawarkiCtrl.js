/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
rsApp.controller('PrzyjecieSpawarkiCtrl', function PrzyjecieSpawarkiCtrl(rsAppState, customerService, manufacturerService, machineryService, repairsWarehouseService) {
    var vm = this;
    rsAppState.PrzyjecieSpawarkiCtrl = vm;

    // nowy pusty obiekt na dane spawarki
    vm.urzadzenie = nowaSpawarka();

    // przyjecie spawarki - obsluga przycisku
    vm.confirmReceipt = 
    function confirmReceipt(goods) {
        console.log("Do ES:", goods);
        // pomaglowac trza troche zanim sie wysle - wrzucic customer ID, manufacturer ID, type ID
        repairsWarehouseService.add(goods);    
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
        // to musi byc tak:
        // kontroler musi miec 'isReady'
        // przycisk dodania modelu jest aktywny tylko gdy producent.isReady i mamy nowy model
        // Model mozna dodac tylko kiedy:
        // 1. Producent jest wybrany (nie jest nowy, nie ma zmian i nie ma bledow).
        // 2. Model jest nowy i nie ma bledow.
});

/*---~~+=============================================================================================+~~---*/
function nowaSpawarka() {
    var obj = {};

    obj.numerPrzyjecia = "1/06/2018"; // dolozyc tabelke do ES na zmienne tego typu
    obj.dataPrzyjecia = new Date();
    // dane klienta
    obj.nazwaFirmy = null;
    obj.telefon = null;
    obj.email = null;
    // dane spawarki
    obj.producent = null;
    obj.model = null;
    obj.numerSeryjny = null;

    // urzadzenia dodatkowe
    obj.chlodnica = {};
    obj.chlodnica.jest = false;
    obj.chlodnica.producent = "";
    obj.chlodnica.model = "";
    obj.chlodnica.numerSeryjny = "";
    obj.podajnik = {};
    obj.podajnik.jest = false;
    obj.podajnik.producent = "";
    obj.podajnik.model = "";
    obj.podajnik.numerSeryjny = "";

    // wyposazenie
    obj.maUchwyt = false;
    obj.maUchwytMasowy = false;
    obj.maAdaptor = false;
    obj.maDrut = false;
    obj.maReduktor = false;
    obj.maInne = null;

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
