/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.botlearning')
        .controller('BotLearning', BotLearning);

    BotLearning.$inject = [];

    function BotLearning() {
        var vm = this;

        vm.text = "Bot Learning";

        init();

        function init() {

        }
    }
})();