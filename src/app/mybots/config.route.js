/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.mybots')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    title: 'My Bots',
                    templateUrl: 'app/mybots/mybots.html',
                }
            }
        ];
    }
})();