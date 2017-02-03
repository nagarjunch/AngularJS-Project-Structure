/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.settings')
        .controller('Settings', Settings);

    Settings.$inject = [];

    function Settings() {
        var vm = this;

        vm.text = "Settings";

        init();

        function init() {

        }
    }
})();