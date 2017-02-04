/**
 * Created by nagarjun on 2/2/17.
 */
(function(ng) {

    'use strict';

    var _module = ng.module('app.core');

    _module.factory('$endpoints', ['$location', function($location) {

        var _exports = {};

        var API_SERVER_URL =  $location.protocol() + '://' + location.host;
        var API_URL_VERSION = '';
        var API_URL_PREFIX = '' + API_URL_VERSION;
        var API_FILE_UPLOAD_SERVER_URL = API_SERVER_URL;

        var endpoints = {
            createBot: API_SERVER_URL + API_URL_PREFIX + '/faq/vijay/bot', //GET
        };

        var serviceList = {

            'xp.bot.create': {
                endpoint: endpoints.createBot,
                method: 'post'
            }
        };

        _exports.serviceList = serviceList;

        _exports.baseUrl = API_SERVER_URL;

        _exports.apiPreFix = API_URL_PREFIX;

        _exports.apiUrlVersion = API_URL_VERSION;

        Object.freeze(_exports);

        return _exports;

    }]);

})(angular);
