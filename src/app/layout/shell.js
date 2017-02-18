/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$location', '$scope', 'sharedServices', 'security'];

    function Shell($location, $scope, sharedServices, security) {
        var vmShell = this;

        vmShell.sidebarToggled = false;
        vmShell.location = $location.path();

        vmShell.toggleSidebar = toggleSidebar;
        vmShell.changePath = changePath;
        vmShell.logout = logout;
        vmShell.isAuthenticated = isAuthenticated;

        init();

        function init() {
        }

        function logout() {
            var modalData = {
                controllerName: 'Modal.warning',
                viewData: {
                    message: 'Are you sure you wish to logout?'
                }
            };

            // Call the modal service.
            sharedServices.callModal(modalData, null);
        }

        function toggleSidebar() {
            vmShell.sidebarToggled = !vmShell.sidebarToggled;

            if(vmShell.sidebarToggled) {
                $( "#sidebar" ).animate({
                    width: "50px"
                }, 200 );
                $("ul.sidebar-menu > li > a > span.title").animate({
                    opacity : 0
                },  50);
                setTimeout(function(){
                    $("ul.sidebar-menu > li > a > span.title").hide();
                }, 50);
            } else {
                $( "#sidebar" ).animate({
                    width: "280px"
                }, 200 );
                $("ul.sidebar-menu > li > a > span.title").animate({
                    opacity : 1
                },  200);
                setTimeout(function(){
                    $("ul.sidebar-menu > li > a > span.title").show();
                }, 200);
            }
        }

        function changePath(path) {
            $location.url(path);
        }

        function isAuthenticated() {
            return security.isAuthenticated();
        }

        // Listeners
        $scope.$on("$locationChangeSuccess", function() {
            vmShell.location = $location.path();
        });
    }
})();