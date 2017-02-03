/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.modals')
        .directive('modalViewAnimator', modalViewAnimator);

    modalViewAnimator.$inject = ['$rootScope', '$window', '$http', '$compile', '$timeout'];

    function modalViewAnimator($rootScope, $window, $http, $compile, $timeout) {

        // Usage:
        // <div modal-view-animator current-view="[currentView]" offset="[value]"></div>

        var directive = {
            restrict: 'A',
            link: link,
            scope: {
                currentView: '=',
                offset: '@'
            }
        };

        return directive;

        function link(scope, element, attrs) {

            // Watch for updates to the current view.
            scope.$watch('currentView', function() {

                // Set a delay to allow for the modal to load.
                $timeout(function() {
                    adjustHeights();
                }, 300);
            }, true);

            // Adjust the heights of the modal body and views.
            function adjustHeights() {
                var totalWinHeight, totalModalHeight, newHeight;
                var selector = '#' + scope.currentView.id;

                // Get the height information for the different elements.
                var heights = {
                    windowHeight: $window.innerHeight,
                    headerHeight: scope.currentView.header === true ? element.find('.modal-header').prop('offsetHeight') : 0,
                    bodyHeight: element.find(selector + ' .template-content').prop('offsetHeight'),
                    footerHeight: scope.currentView.footer === true ? element.find('.modal-footer').prop('offsetHeight') : 0
                };

                // Set the total available window height.
                totalWinHeight = heights.windowHeight - scope.offset;

                // Set the body height to be the max available height if it comes back 0 or undefined.
                if (heights.bodyHeight === 0 || heights.bodyHeight === undefined) {
                    heights.bodyHeight = totalWinHeight - (heights.headerHeight + heights.footerHeight);
                }

                // set the total modal height of all 3 values.
                totalModalHeight = heights.headerHeight + heights.bodyHeight + heights.footerHeight;

                // Adjust the height if it's larger than the available height.
                if (totalModalHeight > totalWinHeight) {
                    newHeight = heights.bodyHeight - (totalModalHeight - totalWinHeight);
                } else {
                    newHeight = heights.bodyHeight;
                }

                // Set the height to the modal.
                element.find(selector).css('height', newHeight);
                element.find('.modal-body').css('height', newHeight);

                // Update the perfect scrollbar to be the correct height.
                element.perfectScrollbar('update');
            }

            // Get the new size when it has been updated.
            scope.$on('sharedServices:resized', adjustHeights);
        }
    }
})();
