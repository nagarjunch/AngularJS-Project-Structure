/**
 * Created by nagarjun on 2/2/17.
 */
(function(ng) {

    'use strict';

    var _module = ng.module('app.core');

    _module.factory('$endpoints', ['$location', function($location) {

        var _exports = {};

        var API_SERVER_URL =  $location.protocol() + '://' + location.host;
        var API_URL_VERSION = '1.1';
        var API_URL_PREFIX = '/api/' + API_URL_VERSION;
        var API_FILE_UPLOAD_SERVER_URL = API_SERVER_URL;

        var endpoints = {
            checkIdStatus: API_SERVER_URL + API_URL_PREFIX + '/check_id_status', //GET
        };

        var serviceList = {

           /* 'mp.user.checkIdStatus': {
                endpoint: endpoints.checkIdStatus,
                method: 'get',
                queryParams: ['emailId', 'phoneNo']
            }*/
        };

        _exports.serviceList = serviceList;

        _exports.baseUrl = API_SERVER_URL;

        _exports.apiPreFix = API_URL_PREFIX;

        _exports.apiUrlVersion = API_URL_VERSION;

        Object.freeze(_exports);

        return _exports;

    }]);

})(angular);
