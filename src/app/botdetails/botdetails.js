/**
 * Created by Nagarjun on 04-02-2017.
 */
(function() {
    'use strict';

    angular
        .module('app.botdetails')
        .controller('BotDetails', BotDetails);

    BotDetails.$inject = ['$routeParams'];

    function BotDetails($routeParams) {
        var vm = this;

        vm.botName = $routeParams.name;
        vm.botQuestions = [1,2,3,4,5];

        init();

        function init() {

        }
    }
})();