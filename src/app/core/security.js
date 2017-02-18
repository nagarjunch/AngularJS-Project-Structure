/**
 * Created by kiran on 05-02-2017.
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('security', security);

    security.$inject = [];

    function security() {
        var service = {
            isAuthenticated: isAuthenticated
        };

        return service;

        function isAuthenticated() {
            return true;
        }
    }
})();