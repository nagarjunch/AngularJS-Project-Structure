/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/settings',
                config: {
                    title: 'Settings',
                    templateUrl: 'app/settings/settings.html',
                }
            }
        ];
    }
})();