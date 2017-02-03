/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.analytics')
        .controller('Analytics', Analytics);

    Analytics.$inject = [];

    function Analytics() {
        var vm = this;

        vm.text = "Analytics";

        init();

        function init() {

        }
    }
})();