/**
 * Created by choda on 2/19/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('toggle', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    if (attrs.toggle == "tooltip") {
                        $(element).tooltip();
                    }
                }
            };
        })
})();
