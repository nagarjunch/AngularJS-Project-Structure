/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('sharedServices', sharedServices);


    sharedServices.$inject = ['$window', '$rootScope', '$q', '$uibModal'];

    function sharedServices($window, $rootScope, $q, $uibModal) {

        var respondSize = '';

        // Watch the window width and adjust the responsive size.
        angular.element($window).bind('resize', function() {
            respondWatch();
            broadcastChange('sharedServices:resized', null);
        });

        var service = {
            callModal: callModal,
            getRespondSize: getRespondSize
        };

        $window.ExternalAuthResponse = function(response) {
            $rootScope.$broadcast('ExternalAuthResponseEvent', response);
        };

        $window.OnChildLoad = function() {
            $rootScope.$broadcast('OnChildLoadEvent');
        };

        return service;


        // Request a modal for the user
        function callModal(modalData, callback) {

            // Establish the modal instance and the options.
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modals.html',
                controller: modalData.controllerName,
                controllerAs: 'vm',
                backdrop: 'static',
                size: 'md',
                resolve: {
                    viewData: function() {
                        return modalData.viewData;
                    }
                }
            });

            // Get the results from the modal and return them.
            modalInstance.result.then(
                function(result) { // Success callback
                    if (callback && callback.done) {
                        callback.done(result);
                    }
                },
                function () { // Error callback; when modal is closed
                    if (callback && callback.cancel) {
                        callback.cancel();
                    }
                });
        }

        // Return the latest responsive size.
        function getRespondSize() {
            respondWatch();
            return $q.when(respondSize);
        }

        // Update the responsive sizes.
        function respondWatch() {
            var newSize, width = $window.innerWidth;

            if (width <= 480) {
                newSize = 'xxs';
            }
            else if (width >= 481 && width < 768) {
                newSize = 'xs';
            }
            else if (width >= 768 && width < 992) {
                newSize = 'sm';
            }
            else if (width >= 992 && width < 1200) {
                newSize = 'md';
            }
            else if (width >= 1200) {
                newSize = 'lg';
            }

            if (newSize != respondSize) {

                // Update the responsize size.
                respondSize = newSize;

                // Alert that the change has taken place.
                broadcastChange('sharedServices:respond', respondSize);
            }

            // Alert if the window is resized at all.
            broadcastChange('sharedServices:resized', null);
        }

        // Broadcast that the layout has been updated.
        function broadcastChange(message, data) {
            $rootScope.$broadcast(message, data);
        }
    }
})();
