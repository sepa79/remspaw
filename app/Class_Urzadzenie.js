class Urzadzenie {
    constructor(repairsWarehouseService) {
        this.numerPrzyjecia = null;
        this.dataPrzyjecia = new Date();
        // dane klienta
        this.idKlienta = null;
        // dane spawarki
        this.idModelu = null;
        this.numerSeryjny = null;
        
        // urzadzenia dodatkowe
        // this.chlodnica = {};
        // this.chlodnica.jest = false;
        // this.chlodnica.producent = "";
        // this.chlodnica.model = "";
        // this.chlodnica.numerSeryjny = "";
        // this.podajnik = {};
        // this.podajnik.jest = false;
        // this.podajnik.producent = "";
        // this.podajnik.model = "";
        // this.podajnik.numerSeryjny = "";
        
        // wyposazenie - specjalny filtr zmieni nazwy na ladne i czytelne, dlatego _ jest uzywane
        this.Wyposazenie = {};
        this.Wyposazenie.uchwyt        = false;
        this.Wyposazenie.uchwyt_masowy = false;
        this.Wyposazenie.adaptor       = false;
        this.Wyposazenie.drut          = false;
        this.Wyposazenie.reduktor      = false;
        this.Wyposazenie.inne          = null;
        
        // wewnetrzne
        this.opisUszkodzenia = null;
        this.dodatkoweInfo = null;
        this.StateHistory = [];
        this.State = {};

        this.Rozpoznanie = new Rozpoznanie();
    }

    static create(objectData){
        // console.log("Create Urzadzenie from: ", objectData);
        var obj = new Urzadzenie();
        Object.assign(obj, objectData);
        // console.log("Urzadzenie is: ", obj);
        return obj;
    }

    addStatus(newStatus){
        var now = new Date();
        this.lastUpdate = now;
        var details = {};
        details.date = now;
        details.state = newStatus.name;
        
        this.StateHistory.push(details);
        this.State = details;
    }

    przyjecieNaStan(){
        var newStatus = RepairStates.Przyjeto;
        this.addStatus(newStatus);
    }

}
