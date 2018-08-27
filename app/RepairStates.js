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
        nextState: ["W_Rozpoznaniu"],
        abortState: ["Rezygnacja"],
        icon: "fas fa-eye"
    },
    "W_Rozpoznaniu": {
        name: "W_Rozpoznaniu",
        actionName: "Rozpoznanie",
        description: "Warsztat sprawdza urządzenie.",
        nextState: ["Rozpoznano"],
        abortState: ["Rezygnacja"],
        icon: "far fa-eye"
    }
    
}
        // Rozpoznano - rozpoznanie gotowe, przejdz do wyceny
        // Wyceniono - wycena gotowa, poinformuj klienta
        // PoinformowanoO_Wycenie - czeka na decyzje klienta
        // DoNaprawy - decyzja podjeta, czeka w kolejce
        // W_Naprawie
        // CzekaNaCzesci
        // Naprawiono - poinformuj klienta
        // NieDaRady - nie potrafimy naprawic, poinformuj klienta
        // PoinformowanoO_Naprawie - klient wie
        // Zezlomuj - klient nie bedzie odbieral
        // DoOdbioru
        // Odebrano
Object.freeze(RepairStates);
