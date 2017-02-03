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

        vm.myBots = [1,2,3,4,5,6,7,8,9,10];

        init();

        function init() {

        }
    }
})();