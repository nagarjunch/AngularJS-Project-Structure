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
        vmShell.sidebarToggled = false;

        vmShell.toggleSidebar = toggleSidebar;

        init();

        function init() {
        }

        function toggleSidebar() {
            console.log("FIRE")
            vmShell.sidebarToggled = !vmShell.sidebarToggled;
        }
    }
})();