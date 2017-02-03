/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    window.___app_kickOff = function startApplication(){
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["app"]);
        });
    }();

    angular.module('app', [
        'app.core',
        'app.layout',
        'app.directives',
        'app.mybots',
        'app.botlearning',
        'app.settings',
        'app.analytics',
        'app.modals',
        'app.util'
    ]);
})();