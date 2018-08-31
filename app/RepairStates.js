var RepairStates = {
    "Przyjeto": {
        name:        "Przyjeto", // musi byc dokladnie to samo jak klucz
        type:        "Initial",
        actionName:  "Przyjęcie", // uzywane na przyciskach
        description: "Przyjęto na serwis, oczekuje na dalsze dyspozycje.",
        nextState:   ["DoRozpoznania"],
        abortState:  ["Rezygnacja"],
        form:        null,
        icon:        "fas fa-warehouse"
    },
    "Rezygnacja": {
        name:        "Rezygnacja",
        type:        "Abort",
        actionName:  "Rezygnacja",
        description: "Klient zrezygnował z naprawy.",
        nextState:   ["DoOdbioru", "Zezlomuj"],
        abortState:  [],
        form:        null,        
        icon:        "fas fa-ban"
    },
    "DoRozpoznania": {
        name:        "DoRozpoznania",
        type:        "WorkQueue",
        actionName:  "Do rozpoznania",
        description: "W kolejce do sprawdzenia.",
        nextState:   ["W_Rozpoznaniu"],
        abortState:  ["Rezygnacja"],
        form:        null,
        icon:        "fas fa-eye"
    },
    "W_Rozpoznaniu": {
        name:        "W_Rozpoznaniu",
        type:        "Work",
        actionName:  "Sprawdź uszkodzenia",
        description: "Warsztat sprawdza urządzenie.",
        nextState:   ["Rozpoznano"],
        abortState:  ["Rezygnacja"],
        form:        "/templates/rozpoznanie.form.html",
        icon:        "fas fa-plug"
    },
    "Rozpoznano": {
        name:        "Rozpoznano",
        type:        "WorkFinished",
        actionName:  null,
        description: "Urządzenie sprawdzone, czeka na wycenę.",
        nextState:   ["Wycena"],
        abortState:  ["Rezygnacja"],
        form:        null,
        icon:        "fas fa-clipboard-list"
    },
    "Wycena": {
        name:        "Wycena",
        type:        "Office",
        actionName:  "Wyceń naprawę",
        description: "Biuro musi dokonać wstępnej wyceny.",
        nextState:   ["Wyceniono"],
        abortState:  ["Rezygnacja"],
        form:        "/templates/wycena.form.html",
        icon:        "fas fa-dollar-sign"
    },
    "Wyceniono": {
        name:        "Wyceniono",
        type:        "OfficeFinished",
        actionName:  null,
        description: "Dokonano wstępnej wyceny.",
        nextState:   ["PoinformowanoO_Wycenie"],
        abortState:  ["Rezygnacja"],
        form:        "/templates/wycena.form.html",
        icon:        "fas fa-coins"
    },
    "PoinformowanoO_Wycenie": {
        name:        "PoinformowanoO_Wycenie",
        type:        "DecissionQueue",
        actionName:  "Pokaż info o kliencie",
        description: "Oczekuje na decyzję klienta.",
        nextState:   ["DoNaprawy"],
        abortState:  ["Rezygnacja"],
        form:        null,
        icon:        "fas fa-phone"
    },
    "DoNaprawy": {
        name:        "DoNaprawy",
        type:        "WorkQueue",
        actionName:  "Zezwól na naprawę",
        description: "W kolejce do naprawy.",
        nextState:   ["W_Naprawie", "CzekaNaCzesci"],
        abortState:  ["Rezygnacja"],
        form:        null,
        icon:        "fas fa-screwdriver"
    },
    "W_Naprawie": {
        name:        "W_Naprawie",
        type:        "Work",
        actionName:  "Rozpocznij naprawę",
        description: "Warsztat naprawia urządzenie.",
        nextState:   ["Naprawiono", "NieDaRady", "CzekaNaCzesci"],
        abortState:  ["Rezygnacja"],
        form:        null,
        icon:        "fas fa-users-cog"
    },
    "CzekaNaCzesci": {
        name:        "CzekaNaCzesci",
        type:        "PartsQueue",
        actionName:  "Brakujące części",
        description: "Urządzenie czeka na części zamienne.",
        nextState:   ["W_Naprawie"],
        abortState:  ["Rezygnacja"],
        form:        null,
        icon:        "fas fa-list-ol"
    },
    "Naprawiono": {
        name:        "Naprawiono",
        type:        "WorkFinished",
        actionName:  null,
        description: "Urządzenie naprawione, czeka na odbiór.",
        nextState:   ["PoinformowanoO_Naprawie"],
        abortState:  ["Rezygnacja"],
        form:        null,
        icon:        "fas fa-thumbs-up"
    },
    "NieDaRady": {
        name:        "NieDaRady",
        type:        "WorkFinished",
        actionName:  null,
        description: "Urządzenie nie zostało naprawione, czeka na odbiór.",
        nextState:   ["PoinformowanoO_Naprawie"],
        abortState:  ["Zezlomuj"],
        form:        null,
        icon:        "fas fa-frown"
    },
    "PoinformowanoO_Naprawie": {
        name:        "PoinformowanoO_Naprawie",
        type:        "DecissionQueue",
        actionName:  "Info o kliencie",
        description: "Oczekuje na kontakt klienta.",
        nextState:   ["DoOdbioru"],
        abortState:  ["Zezlomuj"],
        form:        null,
        icon:        "fas fa-phone-volume"
    },
    "Zezlomuj": {
        name:        "Zezlomuj",
        type:        "Abort",
        actionName:  "Zezłomuj urządzenie",
        description: "Klient zdecydował o złomowaniu urządzenia.",
        nextState:   [],
        abortState:  [],
        form:        null,
        icon:        "fas fa-trash-alt"
    },
    "DoOdbioru": {
        name:        "DoOdbioru",
        type:        "PickupQueue",
        actionName:  null,
        description: "Urządzenie oczekuje na odbiór.",
        nextState:   ["Odbior"],
        abortState:  ["Zezlomuj"],
        form:        null,
        icon:        "fas fa-truck-loading"
    },
    "Odbior": {
        name:        "Odbior",
        type:        "Office",
        actionName:  "Potwierdź odbiór",
        description: "Klient odbiera urządzenie.",
        nextState:   ["Odebrano"],
        abortState:  [],
        form:        "/templates/potwierdzenieOdbioru.form.html",
        icon:        "fas fa-clipboard-check"
    },
    "Odebrano": {
        name:        "Odebrano",
        type:        "Final",
        actionName:  null,
        description: "Klient odebrał urządzenie.",
        nextState:   [],
        abortState:  [],
        form:        null,
        icon:        "fas fa-shipping-fast"
    },
}
Object.freeze(RepairStates);
