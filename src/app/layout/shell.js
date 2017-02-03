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
            vmShell.sidebarToggled = !vmShell.sidebarToggled;

            if(vmShell.sidebarToggled) {
                $( "#sidebar" ).animate({
                    width: "50px"
                }, 500 );
                $("ul.sidebar-menu > li > a > span.title").animate({
                    opacity : 0
                },  500);
            } else {
                $( "#sidebar" ).animate({
                    width: "280px"
                }, 500 );
                $("ul.sidebar-menu > li > a > span.title").animate({
                    opacity : 1
                },  500);
            }
        }
    }
})();