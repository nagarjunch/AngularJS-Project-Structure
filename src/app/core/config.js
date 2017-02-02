/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-top-center';
    }

    var config = {
        appTitle: 'XPro',
        version: '1.0.0'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$animateProvider', '$logProvider', '$routeProvider', 'routehelperConfigProvider', '$locationProvider'];

    function configure ($animateProvider, $logProvider, $routeProvider, routehelperConfigProvider, $locationProvider) {

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Turn on HTML5 mode
        $locationProvider.html5Mode(true);

        // Allow for animation to be turned off.
        $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'XPro: ';
    }
})();
