/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);
    Shell.$inject = [];
    function Shell() {
        var vmShell = this;

        vmShell.test = null;

        init();

        function init() {
            vmShell.test = 'init';
        }
    }
})();