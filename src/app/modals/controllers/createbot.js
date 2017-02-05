/**
 * Created by Nagarjun on 03-02-2017.
 */
(function() {
    'use strict';

    angular
        .module('app.modals')
        .controller('Modal.createBot', createBot);

    createBot.$inject = ['$uibModalInstance', '$window', 'modals', 'viewData', '$scope', '$rootScope', '$translator', 'toastr'];

    function createBot($uibModalInstance, $window, modals, viewData, $scope, $rootScope, $translator, toastr) {

        /* jshint validthis: true */
        var vm = this;
        vm.modalName = 'createbot';
        vm.layoutData = null;
        vm.currentView = null;
        vm.createBotForm = {};

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
            Loading.enable('double-bounce');
            var url = 'xp.bot.create';
            var payload = {
                name: vm.createBotForm.name.$modelValue,
                user: 1
            };
            $translator.translate(url, {}, payload)
                .then(function (response) {
                        console.log(response);
                        Loading.destroy();
                    },
                    function (response) {
                        Loading.destroy();
                        console.log('er');
                        toastr.error('Something went wrong', 'ERROR');
                    });

            $uibModalInstance.close();
        }

        // Cancel the modal.
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
