/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.analytics')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/analytics',
                config: {
                    title: 'Analytics',
                    templateUrl: 'app/analytics/analytics.html',
                }
            }
        ];
    }
})();