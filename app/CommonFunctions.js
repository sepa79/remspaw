var ES_Details = {};
//ES_Details.User = "elasticsearch";
//ES_Details.Password = "elasticsearch";
ES_Details.Url = 'http://192.168.1.60:9200/';
ES_Details.NaprawaSpawarekIndex = 'naprawa_spawarek';
ES_Details.CustomersIndex       = 'dane_klientow';
ES_Details.ManufacturerIndex    = 'producenci';
ES_Details.MachineryIndex       = 'urzadzenia';
ES_Details.PersistentVarsIndex  = 'zmienne';

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Utility functions
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*  Replacement for Number.isInteger() because of lack of support in IE   */
function isInteger ( str ) {
    return  (str|0) == str;
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* Find if element has a certain class */
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* Count properties of the object */
function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}
