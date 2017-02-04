/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.mybots')
        .controller('MyBots', MyBots);

    MyBots.$inject = ['sharedServices'];

    function MyBots(sharedServices) {
        var vm = this;

        vm.myBots = [1,2,3,4,5,6,7,8,9,10];

        vm.createBot = createBot;

        init();

        function init() {

        }

        function createBot() {
            var modalData = {
                controllerName: 'Modal.createBot'
            };

            // Call the modal service.
            sharedServices.callModal(modalData, null);
        }
    }
})();