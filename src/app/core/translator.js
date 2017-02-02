/**
 * Created by nagarjun on 2/2/17.
 */
(function(ng) {

    'use strict';

    var _module = ng.module('app.core');

    _module.factory('$translator', ['$http', '$endpoints', '$util', '$q', function($http, $endpoints, $util, $q) {

        var _regExToParamName = /\:([a-zA-Z]+)/g;

        var HTTP_VERB_GET = 'get',
            HTTP_VERB_POST = 'post',
            HTTP_VERB_PUT = 'put',
            HTTP_VERB_DELETE = 'delete';

        var DEFAULT_HEADERS = {
            'Content-Type': 'application/json;charset=UTF-8'
        };

        var UPLOAD_HEADERS = {
            'Content-Type': undefined//'multipart/form-data'
        };

        var _authObj = null;

        function resolveUrl(toResolveUrl, values, deleteProp) {
            return toResolveUrl.replace(_regExToParamName, function(matchStr, valName) {
                var r = values[valName];
                if (typeof r === 'string' || typeof r === 'number' || typeof r === 'boolean') {
                    return r;
                }
                return typeof r === 'string' || typeof r === 'number' || typeof r === 'boolean' ? r : matchStr;
            });
        }

        function resolveQueryParams(url, qParams, values) {

            // Include some more keys in values before resolving
            var valueKeys = Object.keys(values);
            ng.forEach(qParams, function(query) {
                if(valueKeys.indexOf(query) > -1 && typeof values[query] !== 'undefined' && values[query] !== null) {
                    url += url.indexOf('?') > -1 ? '&' : '?';
                    url += query+'='+values[query];
                }
            });

            return url;
        }

        function genRandQuery() {
            return 'rnd=' + Math.random().toString(36).substr(7);
        }

        var _translator = {};

        _translator.setAuthHeaders = function(authObj) {
            var _authToken = "";
            DEFAULT_HEADERS.Authorization = _authToken;
            UPLOAD_HEADERS.Authorization = _authToken;
        };

        _translator.getAuthObj = function() {
            return _authObj;
        };

        _translator.translate = function(url, params, payload, authObj) {
            var _reqObject = {},
                _url,
                _verb,
                _queryParams,
                _headers = $util.clone(DEFAULT_HEADERS);

            // While getting oldsession, getUserProfile will be called with token taken from localStorage
            if (authObj && typeof authObj === 'object') {
                _headers.Authorization = authObj.token_type + ' ' + authObj.accessToken;
            }

            params = params || {};

            if ($endpoints.serviceList && typeof $endpoints.serviceList === "object") {
                _verb = $endpoints.serviceList[url].method;
                _url = $endpoints.serviceList[url].endpoint;
                _queryParams = $endpoints.serviceList[url].queryParams;
                _url = resolveUrl(_url, params, true); // NOTE: Refactor this by separating path and query params
                _url = resolveQueryParams(_url, _queryParams, params);
            }
            else {
                //throw new Error("Unable to find Endpoint or method");
                alert("Unable to find Endpoint or method");
            }

            _url += _url.indexOf('?') > -1 ? '&' : '?';
            _url += genRandQuery();

            if (_verb === HTTP_VERB_DELETE || _verb === HTTP_VERB_PUT) {
                _headers['X-HTTP-Method-Override'] = _verb;
                _verb = HTTP_VERB_POST;
            }
            _reqObject.method = _verb;
            _reqObject.url = _url;
            _reqObject.headers = _headers || {};
            _reqObject.data = payload || {};

            return $http(_reqObject);
        };

        return _translator;

    }]);

})(angular);

