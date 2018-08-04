/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/

/*******************/
/* Obsluga Klienta */
/*******************/
class CustomerService extends AbstractAutocompleteService {
    constructor($q, esClient) {
        super($q, esClient);
        this.ES_IndexName = ES_Details.CustomersIndex;
        this.init();
        console.log("Nowy klient service", this.customer);
    }

    // obsluga roztomaitych eventow
    init() {
        console.log("Reset w CustomerService");
        this.customer            = {};
        this.customer.nazwaFirmy = null;
        this.customer.telefon    = null;
        this.customer.email      = null;
        // assign our data to model so that autocomplete can display it etc.
        this.model               = this.customer;
        // select the field used for autocomplete
        this.autocompleteField   = "nazwaFirmy";
        // call parent init
        super.init();
    }

    // sprawdzenie formularza - trza to robic z palca bo nazwy pol sie zmieniaja w kazdym formularzu. No chyba, ze kiedys napisza jakis magiczny loop.
    hasErrors(formElement) {
        // magiczny check coby nie bylo bledow w trakcie ladowania strony (ng-cloak cos nie daje rady)
        if( formElement.nazwaFirmy == null || formElement.email == null ) return true;
        return (Object.keys(formElement.nazwaFirmy.$error).length + Object.keys(formElement.email.$error).length) > 0;
    }
}
