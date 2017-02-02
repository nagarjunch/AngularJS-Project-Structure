/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('screenHeight', screenHeight);

    screenHeight.$inject = ['$window', '$timeout'];

    function screenHeight($window, $timeout) {

        var directive = {
            restrict: 'A',
            link: link,
        };

        return directive;

        //////////////////////

        function link(scope, element, attrs) {

            var elem = element[0];
            var height = null;

            scope.$watch(function(){
                return $window.innerHeight;
            }, function(value) {
                adjustHeight();
            });

            // Adjust the height of the element.
            function adjustHeight() {

                // Update to the new height.
                $timeout(function() {

                    // Get the height from the child object.
                    height = $window.innerHeight + 20;

                    // Only add the height if it's a number or more than zero.
                    if (height === undefined || height === 0) {
                        elem.style.minHeight = 'auto';
                    } else {
                        elem.style.minHeight = height + 'px';
                    }

                    elem.style.minHeight = 'auto';

                }, 100);
            }

            // Update the list if it's responsive or if changed through the layout.
            scope.$on('layout:animateUpdated', adjustHeight);

        }
    }
})();
