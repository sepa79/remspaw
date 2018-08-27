var RepairStates = {
    // "" - brak, pusty obiekt
    "Przyjeto": {
        name: "Przyjeto", // musi byc dokladnie to samo jak klucz
        actionName: "Przyjęcie", // uzywane na przyciskach
        description: "Przyjęto na serwis, oczekuje na dalsze dyspozycje.",
        nextState: ["DoRozpoznania"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-warehouse"
    },
    "Rezygnacja": {
        name: "Rezygnacja",
        actionName: "Rezygnacja",
        description: "Klient zrezygnował z naprawy.",
        nextState: ["DoOdbioru", "Zezlomuj"],
        abortState: [],
        icon: "fas fa-ban"
    },
    "DoRozpoznania": {
        name: "DoRozpoznania",
        actionName: "Do rozpoznania",
        description: "W kolejce do sprawdzenia.",
        // BRAK nastepnego stanu - idzie przez Workshop
        nextWorkshopState: ["W_Rozpoznaniu"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-eye"
    },
    "W_Rozpoznaniu": {
        name: "W_Rozpoznaniu",
        actionName: "Sprawdź uszkodzenia",
        description: "Warsztat sprawdza urządzenie.",
        // BRAK nastepnego stanu - idzie przez Workshop
        nextWorkshopState: ["Rozpoznano"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-plug"
    },
    "Rozpoznano": {
        name: "Rozpoznano",
        actionName: "*Rozpoznano*", // BRAK przycisku - stan końcowy po 'W_Rozpoznaniu'
        description: "Urządzenie sprawdzone, czeka na wycenę.",
        nextState: ["Wyceniono"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-clipboard-list"
    },
    "Wyceniono": {
        name: "Wyceniono",
        actionName: "Wyceń naprawę",
        description: "Dokonano wstępnej wyceny.",
        nextState: ["PoinformowanoO_Wycenie"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-coins"
    },
    "PoinformowanoO_Wycenie": {
        name: "PoinformowanoO_Wycenie",
        actionName: "Pokaż info o kliencie",
        description: "Oczekuje na decyzję klienta.",
        nextState: ["DoNaprawy"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-phone"
    },
    "DoNaprawy": {
        name: "DoNaprawy",
        actionName: "Zezwól na naprawę",
        description: "W kolejce do naprawy.",
        // BRAK nastepnego stanu - idzie przez Workshop
        nextWorkshopState: ["W_Naprawie", "CzekaNaCzesci"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-screwdriver"
    },
    "W_Naprawie": {
        name: "W_Naprawie",
        actionName: "Rozpocznij naprawę",
        description: "Warsztat naprawia urządzenie.",
        // BRAK nastepnego stanu - idzie przez Workshop
        nextWorkshopState: ["Naprawiono", "NieDaRady", "CzekaNaCzesci"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-users-cog"
    },
    "CzekaNaCzesci": {
        name: "CzekaNaCzesci",
        actionName: "Podaj brakujące części",
        description: "Urządzenie czeka na części zamienne.",
        nextWorkshopState: ["W_Naprawie"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-list-ol"
    },
    "Naprawiono": {
        name: "Naprawiono",
        actionName: "*Naprawiono*", // BRAK przycisku - stan końcowy po 'W_Naprawie'
        description: "Urządzenie naprawione, czeka na odbiór.",
        nextState: ["PoinformowanoO_Naprawie"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-thumbs-up"
    },
    "NieDaRady": {
        name: "NieDaRady",
        actionName: "*NieDaRady*", // BRAK przycisku - stan końcowy po 'W_Naprawie'
        description: "Urządzenie nie zostało naprawione, czeka na odbiór.",
        nextState: ["PoinformowanoO_Naprawie"],
        abortState: ["Zezlomuj"],
        icon: "fas fa-frown"
    },
    "PoinformowanoO_Naprawie": {
        name: "PoinformowanoO_Naprawie",
        actionName: "Pokaż info o kliencie",
        description: "Oczekuje na kontakt klienta.",
        nextState: ["DoOdbioru"],
        abortState: ["Zezlomuj"],
        icon: "fas fa-phone-volume"
    },
    "Zezlomuj": {
        name: "Zezlomuj",
        actionName: "Zezłomuj urządzenie",
        description: "Klient zdecydował o złomowaniu urządzenia.",
        nextState: [],
        abortState: [],
        icon: "fas fa-poo"
    },
    "DoOdbioru": {
        name: "DoOdbioru",
        actionName: "*DoOdbioru*", // BRAK przycisku - stan końcowy po 'PoinformowanoO_Naprawie'
        description: "Urządzenie oczekuje na odbiór.",
        nextState: ["Odebrano"],
        abortState: ["Zezlomuj"],
        icon: "fas fa-truck-loading"
    },
    "Odebrano": {
        name: "Odebrano",
        actionName: "Potwierdź odbiór",
        description: "Klient odebrał urządzenie.",
        nextState: [],
        abortState: [],
        icon: "fas fa-shipping-fast"
    },
}
Object.freeze(RepairStates);
