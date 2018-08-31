/*---~~+=============================================================================================+~~---*/
/*---~~+ RemSpaw App                                                                                 +~~---*/
/*---~~+=============================================================================================+~~---*/
rsApp.controller('StateCtrl', function StateCtrl($mdDialog, repairsWarehouseService) {
    console.log("New StateCtrl");
    var vm = this;
    
    vm.getActionName = getActionName;
    function getActionName(state){
        // console.log("getActionName: ", state);
        return RepairStates[state].actionName;
    }
    vm.getTooltip = getTooltip;
    function getTooltip(state){
        return RepairStates[state].description;
    }
    vm.getIcon = getIcon;
    function getIcon(state){
        return RepairStates[state].icon;
    }
    vm.getNextOfficeState = getNextOfficeState;
    function getNextOfficeState(state){
        return filterStates(RepairStates[state].nextState, ["Office", "WorkFinished", "WorkQueue", "DecissionQueue", "PartsQueue", "PickupQueue"]);
    }
    vm.getNextWorkshopState = getNextWorkshopState;
    function getNextWorkshopState(state){
        return filterStates(RepairStates[state].nextState, ["Work"]);
    }
    vm.getAbortState = getAbortState;
    function getAbortState(state){
        return RepairStates[state].abortState;
    }

    function filterStates(states, filters){
        var filteredStates = [];
        states.forEach(state => {
            filters.forEach(filter => {
                if(RepairStates[state].type == filter) filteredStates.push(state);
            });
        });
        return filteredStates;
    }
    

    // przejdz do kolejnego stanu - wyswietl formularz do obslugi danego stanu
    vm.gotoNextState = gotoNextState;
    function gotoNextState(ev, row, state){
        console.log("gotoNextState: ", row.id, state);
        var urzadzenie = Urzadzenie.create(row);

        // wyswietl forme jesli jakas jest
        if(RepairStates[state].form){
            $mdDialog.show({
                locals:{urzadzenie: urzadzenie, state: state}, 
                controller: DialogController, // chyba tez bedzie custom dla kazdego dialogu
                templateUrl: RepairStates[state].form,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
            }).then(function(result) {
                Object.assign(row, result);
            }, function() {
                // cancel pressed
            });
        } else {
            urzadzenie.addStatus(RepairStates[state]);
            Object.assign(row, urzadzenie);
        }
    }

    function DialogController($scope, $mdDialog, urzadzenie, state) {
        // console.log("DialogController: ", urzadzenie, state);
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.finish = function () {
            var finishState = filterStates(RepairStates[state].nextState, ["WorkFinished", "OfficeFinished", "Final"]);
            urzadzenie.addStatus(RepairStates[finishState[0]]);
            // console.log("finish DialogController: ", urzadzenie, state);
            $mdDialog.hide(urzadzenie);
        };
        $scope.continueLater = function () {
            $mdDialog.hide(urzadzenie);
        };
        $scope.urzadzenie = urzadzenie;
        $scope.state = state;
    }
});
    