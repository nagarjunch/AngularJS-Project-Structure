/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.mybots')
        .controller('MyBots', MyBots);

    MyBots.$inject = [];

    function MyBots() {
        var vm = this;

        vm.text = "My Bots";

        init();

        function init() {

        }
    }
})();