/**
 * Created by Nagarjun on 04-02-2017.
 */
(function() {
    'use strict';

    angular
        .module('app.botdetails')
        .controller('BotDetails', BotDetails);

    BotDetails.$inject = ['$routeParams', 'sharedServices'];

    function BotDetails($routeParams, sharedServices) {
        var vm = this;

        vm.botName = $routeParams.name;
        vm.botQuestions = [1,2,3,4,5];

        vm.addQuestion = addQuestion;
        vm.editQuestion = editQuestion;
        vm.deleteQuestion = deleteQuestion;
        
        init();

        function init() {

        }
        
        function addQuestion() {
            var modalData = {
                controllerName: 'Modal.addEditQuestion'
            };

            // Call the modal service.
            sharedServices.callModal(modalData, null);
        }

        function editQuestion() {
            var modalData = {
                controllerName: 'Modal.addEditQuestion',
                viewData: {
                    isEdit: true
                }
            };

            // Call the modal service.
            sharedServices.callModal(modalData, null);
        }

        function deleteQuestion() {
            var modalData = {
                controllerName: 'Modal.warning',
                viewData: {
                    message: 'Are you sure you wish to delete this utterance?'
                }
            };

            // Call the modal service.
            sharedServices.callModal(modalData, null);
        }
    }
})();