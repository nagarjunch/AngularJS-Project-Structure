(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize',
        /*
         * Our reusable cross app code modules
         */
        'util.router',
        /*
         * 3rd Party modules
         */
        'ngplus', 'ui.bootstrap', 'angularMoment',
        'luegg.directives', 'timer', 'validation.match',
        'angular-filters'
    ]);
})();