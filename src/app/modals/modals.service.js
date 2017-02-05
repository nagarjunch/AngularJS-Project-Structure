/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.modals')
        .factory('modals', modals);

    modals.$inject = ['$q', '$rootScope', '$window'];

    function modals($q, $rootScope, $window) {

        // The available modal layouts.
        var modalLayout = [
            {
                name: 'warning',
                type: 'app',
                acceptButton: 'Yes',
                views: [
                    {
                        title: 'Warning',
                        name: 'warning',
                        id: 'm-00',
                        template: 'app/modals/templates/warning.html',
                        header: true,
                        footer: true
                    }
                ]
            },
            {
                name: 'createbot',
                type: 'app',
                acceptButton: 'Create',
                views: [
                    {
                        title: 'Create Bot',
                        name: 'createbot',
                        id: 'm-00',
                        template: 'app/modals/templates/createbot.html',
                        header: true,
                        footer: true
                    }
                ]
            },
            {
                name: 'addeditquestion',
                type: 'app',
                acceptButton: 'Save',
                views: [
                    {
                        title: 'Add Question',
                        name: 'addeditquestion',
                        id: 'm-00',
                        template: 'app/modals/templates/addeditquestion.html',
                        header: true,
                        footer: true
                    }
                ]
            }
        ];

        var service = {
            getModalLayout: getModalLayout
        };

        return service;

        // return the needed modal layout data.
        function getModalLayout(name) {
            var dataSet = null;
            for (var i = 0; i < modalLayout.length; i++) {
                if (modalLayout[i].name === name) {
                    dataSet = modalLayout[i];
                    break;
                }
            }

            // Return back the data.
            return $q.when(dataSet);
        }
    }

})();
