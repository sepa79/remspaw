/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
/********************/
/* Obsluga Urzadzen */
/********************/
class ManufacturerService extends AbstractAutocompleteService {
    constructor($q, esClient) {
        super($q, esClient);
        this.ES_IndexName = ES_Details.ManufacturerIndex;
        this.init();
        console.log("Nowy ManufacturerService");
    }

    // obsluga roztomaitych eventow
    init() {
        this.manufacturer            = {};
        this.manufacturer.nazwaFirmy = null;
        // assign our data to model so that autocomplete can display it etc.
        this.model               = this.manufacturer;
        // select the field used for autocomplete
        this.autocompleteField   = "nazwaFirmy";
        // call parent init
        super.init();
    }

    // Sprawdzenie formularza - trza to robic z palca bo nazwy pol sie zmieniaja w kazdym formularzu.
    // No chyba, ze kiedys napisza jakis magiczny loop, albo jak autocomplete bedzie dla pojedynczego formularza, bo terozki sa 3 rozne jako 1.
    hasErrors(formElement) {
        // console.log(formElement);
        // magiczny check coby nie bylo bledow w trakcie ladowania strony (ng-cloak cos nie daje rady)
        if( formElement.producent == null ) return true;
        return Object.keys(formElement.producent.$error).length > 0;
    }

}
