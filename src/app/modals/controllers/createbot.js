/**
 * Created by Nagarjun on 03-02-2017.
 */
(function() {
    'use strict';

    angular
        .module('app.modals')
        .controller('Modal.createBot', logout);

    logout.$inject = ['$uibModalInstance', '$window', 'modals', 'viewData', '$scope', '$rootScope'];

    function logout($uibModalInstance, $window, modals, viewData, $scope, $rootScope) {

        /* jshint validthis: true */
        var vm = this;
        vm.modalName = 'createbot';
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
            });
        }

        // Accept the modal.
        function accept() {
            $uibModalInstance.close(result);
        }

        // Cancel the modal.
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
