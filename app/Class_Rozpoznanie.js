class Rozpoznanie {
    constructor() {
        this.stwierdzoneUszkodzenia = null;
        this.dataZakonczenia        = null;
        this.lastUpdate             = null;
        this.Tests = {};
        this.Tests.testObwoduOchronnego = "Nie wykonano";
        this.Tests.testZespoluPodajnika = "Nie wykonano";
        this.Tests.testUkladuChlodzenia = "Nie wykonano";
        this.Tests.testGniazdIWtykow    = "Nie wykonano";
        this.Tests.testWentylatora      = "Nie wykonano";
        this.Tests.testZakresow         = "Nie wykonano";
        this.Tests.yprobaUrzadzenia     = "Nie wykonano"; // 'y' w nazwie coby wymusic sortowanie - automat to wyswietla
        this.Tests.zinne                = "Nie wykonano";
    }
    getPrettyName(test){
        var prettyNames = {};
        prettyNames.testObwoduOchronnego = "Test obwodu ochronnego i rezystancji izolacji";
        prettyNames.testZespoluPodajnika = "Test zespołu podajnika";
        prettyNames.testUkladuChlodzenia = "Test układu chłodzenia (l/min)";
        prettyNames.testGniazdIWtykow    = "Test gniazd i wtyków prądowych";
        prettyNames.testWentylatora      = "Test wentylatora";
        prettyNames.testZakresow         = "Test zakresów prądowych";
        prettyNames.yprobaUrzadzenia     = "Próba urządzenia";
        prettyNames.zinne                = "Inne";

        return prettyNames[test];
    }
    finish(){
        var now = new Date();
        this.lastUpdate = now;
        this.dataZakonczenia = now;
    }
    continueLater(){
        var now = new Date();
        this.lastUpdate = now;
    }
}