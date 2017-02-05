/**
 * Created by Nagarjun on 03-02-2017.
 */
(function() {
    'use strict';

    angular
        .module('app.modals')
        .controller('Modal.addEditQuestion', addEditQuestion);

    addEditQuestion.$inject = ['$uibModalInstance', '$window', 'modals', 'viewData', '$scope', '$rootScope'];

    function addEditQuestion($uibModalInstance, $window, modals, viewData, $scope, $rootScope) {

        /* jshint validthis: true */
        var vm = this;
        vm.modalName = 'addeditquestion';
        vm.layoutData = null;
        vm.currentView = null;

        vm.viewData = viewData;

        // Functions
        vm.accept = accept;
        vm.cancel = cancel;

        activate();

        function activate() {

            // Get the layout required
            modals.getModalLayout(vm.modalName).then(function(data) {
                // Bind the data to the layout.
                vm.layoutData = data;

                // Set the initial data and status.
                vm.currentView = vm.layoutData.views[0];

                if(viewData && viewData.isEdit) {
                    vm.currentView.title = "Edit Question";
                } else {
                    vm.currentView.title = "Add Question";
                }
            });
        }

        // Accept the modal.
        function accept() {
            $uibModalInstance.close();
        }

        // Cancel the modal.
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
