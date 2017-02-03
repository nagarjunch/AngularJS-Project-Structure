/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.botlearning')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/botlearning',
                config: {
                    title: 'Bot Learning',
                    templateUrl: 'app/botlearning/botlearning.html',
                }
            }
        ];
    }
})();