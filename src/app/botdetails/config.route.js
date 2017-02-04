/**
 * Created by Nagarjun on 04-02-2017.
 */
(function() {
    'use strict';

    angular
        .module('app.botdetails')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/botdetails/:name',
                config: {
                    title: 'Bot Details',
                    templateUrl: 'app/botdetails/botdetails.html',
                }
            }
        ];
    }
})();