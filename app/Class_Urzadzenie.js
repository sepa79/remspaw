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
        
        // wyposazenie
        this.Wyposazenie = {};
        this.Wyposazenie.maUchwyt       = false;
        this.Wyposazenie.maUchwytMasowy = false;
        this.Wyposazenie.maAdaptor      = false;
        this.Wyposazenie.maDrut         = false;
        this.Wyposazenie.maReduktor     = false;
        this.Wyposazenie.dodatkowe      = null;
        
        // wewnetrzne
        this.dodatkoweInfo = null;
        this.StateHistory = [];
        this.State = {};
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
