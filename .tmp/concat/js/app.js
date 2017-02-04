/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    window.___app_kickOff = function startApplication(){
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["app"]);
        });
    }();

    angular.module('app', [
        'app.core',
        'app.layout',
        'app.directives',
        'app.mybots',
        'app.botlearning',
        'app.settings',
        'app.analytics',
        'app.modals',
        'app.util',
        'app.botdetails'
    ]);
})();
/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    angular.module('util.router', [
        'ngRoute'
    ]);
})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular.module('app.util', []);
})();
/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    angular
        .module('util.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', '$route',  'routehelperConfig'];

    // Must configure via the routehelperConfigProvider
    function routehelperConfig() {

        /* jshint validthis:true */
        this.config = {

            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $route, routehelperConfig) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $routeProvider = routehelperConfig.config.$routeProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts
        };

        handleRoutingSecurity();
        handleRoutingErrors();

        return service;
        ///////////////

        function configureRoutes(routes) {
            routes.forEach(function(route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }

        function handleRoutingSecurity() {

        }

        function handleRoutingErrors() {

            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
                if (handlingRouteChangeError) {
                    return;
                }
                routeCounts.errors++;
                handlingRouteChangeError = true;
                $location.path('/');
            });
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }
    }
})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.util')
        .directive('perfectScrollbar', perfectScrollbar);

    perfectScrollbar.$inject = ['$rootScope', '$parse', '$window', '$timeout'];

    function perfectScrollbar($rootScope, $parse, $window, $timeout) {

        // Usage:
        // <perfect-scrollbar></perfect-scrollbar>

        // The options for perfect scrollbar.
        var psOptions = [
            'wheelSpeed', 'wheelPropagation', 'minScrollbarLength', 'useBothWheelAxes',
            'useKeyboard', 'suppressScrollX', 'suppressScrollY', 'scrollXMarginOffset',
            'scrollYMarginOffset', 'includePadding', 'onScroll', 'scrollDown'
        ];

        var directive = {
            restrict: 'EA',
            transclude: true,
            template: '<div><div ng-transclude></div></div>',
            replace: true,
            link: link,
            controller: perfectScrollbarController
        };

        return directive;

        //////////////////////

        function link($scope, $elem, $attr) {

            var jqWindow = angular.element($window);
            var options = {};
            var scrollDown = false;
            var currentWidth = 0;

            for (var i=0, l=psOptions.length; i<l; i++) {
                var opt = psOptions[i];
                if ($attr[opt] !== undefined) {
                    options[opt] = $parse($attr[opt])();
                }
            }

            $scope.$evalAsync(function() {
                var onScrollHandler = $parse($attr.onScroll);

                $elem.perfectScrollbar(options);

                $elem.scroll(function(){
                    var scrollTop = $elem.scrollTop();
                    var scrollHeight = $elem.prop('scrollHeight') - $elem.height();

                    $scope.$apply(function() {
                        onScrollHandler($scope, {
                            scrollTop: scrollTop,
                            scrollHeight: scrollHeight
                        });
                    });

                    // Broadcast that the perfect scrollbar scrolled.
                    $rootScope.$broadcast('perfectScrollbar:scroll', scrollTop);
                });

                if ($attr.stickyItems) {
                    stickyItems();
                }
            });

            function update(event) {
                $scope.$evalAsync(function() {
                    if ($attr.scrollDown == 'true' && event != 'mouseenter') {
                        $timeout(function () {
                            $($elem).scrollTop($($elem).prop("scrollHeight"));
                        }, 100);
                    }
                    $timeout(function () {
                        $elem.perfectScrollbar('update');
                    }, 30);

                    $timeout(function () {
                        $elem.perfectScrollbar('update');
                    }, 310);
                });
            }

            function stickyItems() {
                var width = $elem.prop('offsetWidth');
                $rootScope.$broadcast('perfectScrollbar:sticky', width);
            }

            function scrollTop(type) {
                var scrollHeight = $elem.prop('scrollHeight');
                if (scrollHeight !== 0) {
                    switch(type) {

                        // Scroll up instantly.
                        case 'instant':
                            $($elem).scrollTop(0);
                            break;

                        // Scroll up using animation.
                        case 'animate':
                            $timeout(function () {
                                $($elem).animate({scrollTop: 0}, 600);
                            }, 300);
                            break;
                    }
                }
            }

            // This is necessary when you don't watch anything with the scrollbar
            $elem.bind('mouseenter', update('mouseenter'));

            // Watch these items and update the scrollbars if any change.
            if ($attr.refreshOnChange) {
                $scope.$watchCollection($attr.refreshOnChange, function() {
                    update();

                    // If Refresh Scroll is present.
                    if ($attr.refreshScroll) {

                        // Update instantly or animated.
                        if ($attr.refreshScroll === 'instant') {
                            scrollTop('instant');
                        } else {
                            scrollTop('animate');
                        }
                    }
                });
            }

            // if Infinite scroll, run the attribute function.
            if ($attr.infiniteScroll) {
                var loadHandler = $parse($attr.infiniteScroll);
                $(document).on('ps-scroll-down', function (event) {
                    scrollDown = true;
                });
                $(document).on('ps-y-reach-end', function (event) {
                    if (scrollDown === true) {
                        loadHandler($scope);
                        scrollDown = false;
                    }
                });
            }

            if ($attr.refreshOnResize) {
                jqWindow.on('resize', update);
            }

            $elem.bind('$destroy', function() {
                jqWindow.off('resize', update);
                $elem.perfectScrollbar('destroy');
            });

            $scope.$on('sharedServices:resized', stickyItems);
            $scope.$on('layout:animateUpdated', stickyItems);
        }
    }


    // Perfect Scrollbar Controller
    function perfectScrollbarController() {

        /* jshint validthis: true */
        var vm = this;
        vm.items = [];

        // Functions
        vm.setItem = setItem;
        vm.checkOverlap = checkOverlap;
        vm.checkCover = checkCover;

        // Set the items of which have stickyness.
        function setItem(index, offset, status, height, offsetTop) {
            vm.items[index] = {
                offset: offset,
                status: status,
                height: height,
                offsetTop: offsetTop
            };
        }

        // Check to see if the items overlap each other.
        function checkOverlap(index, callback) {
            var nextItem = index + 1;
            var overlap = false;
            var overlapNum = null;

            // Check to see if the item exists.
            if (vm.items[nextItem] !== undefined) {

                // Get the total overlap area.
                overlapNum = (vm.items[nextItem].height / 2) + vm.items[nextItem].offset;

                // check the overlap with the full overlap area.
                if(vm.items[nextItem].offsetTop <= overlapNum) {
                    overlap = true;
                }
            }

            // Return the overlap notice.
            callback(overlap);
        }

        // Check to see if the items cover each other.
        function checkCover(index, callback) {
            var nextItem = index + 1;
            var covered = false;

            // Make sure there is a next item.
            if (vm.items[nextItem] !== undefined) {
                if (vm.items[nextItem].status === 'sticky') {
                    covered = true;
                }
            }

            // Return the covered notice.
            callback(covered);
        }


    }


})();

(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize',
        /*
         * Our reusable cross app code modules
         */
        'util.router',
        /*
         * 3rd Party modules
         */
        'ngplus', 'ui.bootstrap', 'angularMoment',
        'luegg.directives', 'timer', 'validation.match',
        'angular-filters'
    ]);
})();
/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-top-center';
    }

    var config = {
        appTitle: 'XPro',
        version: '1.0.0'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$animateProvider', '$logProvider', '$routeProvider', 'routehelperConfigProvider', '$locationProvider'];

    function configure ($animateProvider, $logProvider, $routeProvider, routehelperConfigProvider, $locationProvider) {

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Turn on HTML5 mode
        $locationProvider.html5Mode(true);

        // Allow for animation to be turned off.
        $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'XPro: ';
    }
})();

/**
 * Created by nagarjun on 2/2/17.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr);
})();


/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('sharedServices', sharedServices);


    sharedServices.$inject = ['$window', '$rootScope', '$q', '$uibModal'];

    function sharedServices($window, $rootScope, $q, $uibModal) {

        var respondSize = '';

        // Watch the window width and adjust the responsive size.
        angular.element($window).bind('resize', function() {
            respondWatch();
            broadcastChange('sharedServices:resized', null);
        });

        var service = {
            callModal: callModal,
            getRespondSize: getRespondSize
        };

        $window.ExternalAuthResponse = function(response) {
            $rootScope.$broadcast('ExternalAuthResponseEvent', response);
        };

        $window.OnChildLoad = function() {
            $rootScope.$broadcast('OnChildLoadEvent');
        };

        return service;


        // Request a modal for the user
        function callModal(modalData, callback) {

            // Establish the modal instance and the options.
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modals.html',
                controller: modalData.controllerName,
                controllerAs: 'vm',
                backdrop: 'static',
                size: 'md',
                resolve: {
                    viewData: function() {
                        return modalData.viewData;
                    }
                }
            });

            // Get the results from the modal and return them.
            modalInstance.result.then(
                function(result) { // Success callback
                    if (callback && callback.done) {
                        callback.done(result);
                    }
                },
                function () { // Error callback; when modal is closed
                    if (callback && callback.cancel) {
                        callback.cancel();
                    }
                });
        }

        // Return the latest responsive size.
        function getRespondSize() {
            respondWatch();
            return $q.when(respondSize);
        }

        // Update the responsive sizes.
        function respondWatch() {
            var newSize, width = $window.innerWidth;

            if (width <= 480) {
                newSize = 'xxs';
            }
            else if (width >= 481 && width < 768) {
                newSize = 'xs';
            }
            else if (width >= 768 && width < 992) {
                newSize = 'sm';
            }
            else if (width >= 992 && width < 1200) {
                newSize = 'md';
            }
            else if (width >= 1200) {
                newSize = 'lg';
            }

            if (newSize != respondSize) {

                // Update the responsize size.
                respondSize = newSize;

                // Alert that the change has taken place.
                broadcastChange('sharedServices:respond', respondSize);
            }

            // Alert if the window is resized at all.
            broadcastChange('sharedServices:resized', null);
        }

        // Broadcast that the layout has been updated.
        function broadcastChange(message, data) {
            $rootScope.$broadcast(message, data);
        }
    }
})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular.module('app.modals', []);
})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.modals')
        .factory('modals', modals);

    modals.$inject = ['$q', '$rootScope', '$window'];

    function modals($q, $rootScope, $window) {

        // The available modal layouts.
        var modalLayout = [
            {
                name: 'logout',
                type: 'app',
                acceptButton: 'Logout',
                views: [
                    {
                        title: 'Logout',
                        name: 'logout',
                        id: 'm-00',
                        template: 'app/modals/templates/logout.html',
                        header: true,
                        footer: true
                    }
                ]
            },
            {
                name: 'createbot',
                type: 'app',
                acceptButton: 'Create',
                views: [
                    {
                        title: 'Create Bot',
                        name: 'createbot',
                        id: 'm-00',
                        template: 'app/modals/templates/createbot.html',
                        header: true,
                        footer: true
                    }
                ]
            }
        ];

        var service = {
            getModalLayout: getModalLayout
        };

        return service;

        // return the needed modal layout data.
        function getModalLayout(name) {
            var dataSet = null;
            for (var i = 0; i < modalLayout.length; i++) {
                if (modalLayout[i].name === name) {
                    dataSet = modalLayout[i];
                    break;
                }
            }

            // Return back the data.
            return $q.when(dataSet);
        }
    }

})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.modals')
        .directive('modalViewAnimator', modalViewAnimator);

    modalViewAnimator.$inject = ['$rootScope', '$window', '$http', '$compile', '$timeout'];

    function modalViewAnimator($rootScope, $window, $http, $compile, $timeout) {

        // Usage:
        // <div modal-view-animator current-view="[currentView]" offset="[value]"></div>

        var directive = {
            restrict: 'A',
            link: link,
            scope: {
                currentView: '=',
                offset: '@'
            }
        };

        return directive;

        function link(scope, element, attrs) {

            // Watch for updates to the current view.
            scope.$watch('currentView', function() {

                // Set a delay to allow for the modal to load.
                $timeout(function() {
                    adjustHeights();
                }, 300);
            }, true);

            // Adjust the heights of the modal body and views.
            function adjustHeights() {
                var totalWinHeight, totalModalHeight, newHeight;
                var selector = '#' + scope.currentView.id;

                // Get the height information for the different elements.
                var heights = {
                    windowHeight: $window.innerHeight,
                    headerHeight: scope.currentView.header === true ? element.find('.modal-header').prop('offsetHeight') : 0,
                    bodyHeight: element.find(selector + ' .template-content').prop('offsetHeight'),
                    footerHeight: scope.currentView.footer === true ? element.find('.modal-footer').prop('offsetHeight') : 0
                };

                // Set the total available window height.
                totalWinHeight = heights.windowHeight - scope.offset;

                // Set the body height to be the max available height if it comes back 0 or undefined.
                if (heights.bodyHeight === 0 || heights.bodyHeight === undefined) {
                    heights.bodyHeight = totalWinHeight - (heights.headerHeight + heights.footerHeight);
                }

                // set the total modal height of all 3 values.
                totalModalHeight = heights.headerHeight + heights.bodyHeight + heights.footerHeight;

                // Adjust the height if it's larger than the available height.
                if (totalModalHeight > totalWinHeight) {
                    newHeight = heights.bodyHeight - (totalModalHeight - totalWinHeight);
                } else {
                    newHeight = heights.bodyHeight;
                }

                // Set the height to the modal.
                element.find(selector).css('height', newHeight);
                element.find('.modal-body').css('height', newHeight);

                // Update the perfect scrollbar to be the correct height.
                element.perfectScrollbar('update');
            }

            // Get the new size when it has been updated.
            scope.$on('sharedServices:resized', adjustHeights);
        }
    }
})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.modals')
        .controller('Modal.logout', logout);

    logout.$inject = ['$uibModalInstance', '$window', 'modals', 'viewData', '$scope', '$rootScope'];

    function logout($uibModalInstance, $window, modals, viewData, $scope, $rootScope) {

        /* jshint validthis: true */
        var vm = this;
        vm.modalName = 'logout';
        vm.layoutData = null;
        vm.currentView = null;

        vm.viewData = viewData;

        // Functions
        vm.accept = accept;
        vm.cancel = cancel;

        activate();

        function activate() {

            // Get the layout required
            modals.getModalLayout(vm.modalName).then(function(data) {
                // Bind the data to the layout.
                vm.layoutData = data;

                // Set the initial data and status.
                vm.currentView = vm.layoutData.views[0];
            });
        }

        // Accept the modal.
        function accept() {
            $uibModalInstance.close();
        }

        // Cancel the modal.
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();

/**
 * Created by Nagarjun on 03-02-2017.
 */
(function() {
    'use strict';

    angular
        .module('app.modals')
        .controller('Modal.createBot', logout);

    logout.$inject = ['$uibModalInstance', '$window', 'modals', 'viewData', '$scope', '$rootScope'];

    function logout($uibModalInstance, $window, modals, viewData, $scope, $rootScope) {

        /* jshint validthis: true */
        var vm = this;
        vm.modalName = 'createbot';
        vm.layoutData = null;
        vm.currentView = null;

        vm.viewData = viewData;

        // Functions
        vm.accept = accept;
        vm.cancel = cancel;

        activate();

        function activate() {

            // Get the layout required
            modals.getModalLayout(vm.modalName).then(function(data) {
                // Bind the data to the layout.
                vm.layoutData = data;

                // Set the initial data and status.
                vm.currentView = vm.layoutData.views[0];
            });
        }

        // Accept the modal.
        function accept() {
            $uibModalInstance.close(result);
        }

        // Cancel the modal.
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();

/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    angular.module('app.layout', []);
})();
/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$location', '$scope', 'sharedServices'];

    function Shell($location, $scope, sharedServices) {
        var vmShell = this;

        vmShell.sidebarToggled = false;
        vmShell.location = $location.path();

        vmShell.toggleSidebar = toggleSidebar;
        vmShell.changePath = changePath;
        vmShell.logout = logout;

        init();

        function init() {
        }

        function logout() {
            var modalData = {
                controllerName: 'Modal.logout'
            };

            // Call the modal service.
            sharedServices.callModal(modalData, null);
        }

        function toggleSidebar() {
            vmShell.sidebarToggled = !vmShell.sidebarToggled;

            if(vmShell.sidebarToggled) {
                $( "#sidebar" ).animate({
                    width: "50px"
                }, 300 );
                $("ul.sidebar-menu > li > a > span.title").animate({
                    opacity : 0
                },  300);
                setTimeout(function(){
                    $("ul.sidebar-menu > li > a > span.title").hide();
                }, 50);
            } else {
                $( "#sidebar" ).animate({
                    width: "280px"
                }, 300 );
                $("ul.sidebar-menu > li > a > span.title").animate({
                    opacity : 1
                },  300);
                setTimeout(function(){
                    $("ul.sidebar-menu > li > a > span.title").show();
                }, 200);
            }
        }

        function changePath(path) {
            $location.url(path);
        }

        // Listeners
        $scope.$on("$locationChangeSuccess", function() {
            vmShell.location = $location.path();
        });
    }
})();
/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    angular.module('app.directives', []);
})();

/**
 * Created by nagarjun on 2/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('screenHeight', screenHeight);

    screenHeight.$inject = ['$window', '$timeout'];

    function screenHeight($window, $timeout) {

        var directive = {
            restrict: 'A',
            link: link,
        };

        return directive;

        //////////////////////

        function link(scope, element, attrs) {

            var elem = element[0];
            var height = null;

            scope.$watch(function(){
                return $window.innerHeight;
            }, function(value) {
                adjustHeight();
            });

            // Adjust the height of the element.
            function adjustHeight() {

                // Update to the new height.
                $timeout(function() {

                    // Get the height from the child object.
                    height = $window.innerHeight + 20;

                    // Only add the height if it's a number or more than zero.
                    if (height === undefined || height === 0) {
                        elem.style.minHeight = 'auto';
                    } else {
                        elem.style.minHeight = height + 'px';
                    }

                    elem.style.minHeight = 'auto';

                }, 100);
            }

            // Update the list if it's responsive or if changed through the layout.
            scope.$on('layout:animateUpdated', adjustHeight);

        }
    }
})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular.module('app.mybots', []);
})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.mybots')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    title: 'My Bots',
                    templateUrl: 'app/mybots/mybots.html',
                }
            }
        ];
    }
})();
/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.mybots')
        .controller('MyBots', MyBots);

    MyBots.$inject = ['sharedServices'];

    function MyBots(sharedServices) {
        var vm = this;

        vm.myBots = [1,2,3,4,5,6,7,8,9,10];

        vm.createBot = createBot;

        init();

        function init() {

        }

        function createBot() {
            var modalData = {
                controllerName: 'Modal.createBot'
            };

            // Call the modal service.
            sharedServices.callModal(modalData, null);
        }
    }
})();
/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular.module('app.botlearning', []);
})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.botlearning')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/botlearning',
                config: {
                    title: 'Bot Learning',
                    templateUrl: 'app/botlearning/botlearning.html',
                }
            }
        ];
    }
})();
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
/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular.module('app.settings', []);
})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/settings',
                config: {
                    title: 'Settings',
                    templateUrl: 'app/settings/settings.html',
                }
            }
        ];
    }
})();
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
/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular.module('app.analytics', []);
})();

/**
 * Created by nagarjun on 3/2/17.
 */
(function() {
    'use strict';

    angular
        .module('app.analytics')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/analytics',
                config: {
                    title: 'Analytics',
                    templateUrl: 'app/analytics/analytics.html',
                }
            }
        ];
    }
})();
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
/**
 * Created by Nagarjun on 04-02-2017.
 */
(function() {
    'use strict';

    angular.module('app.botdetails', []);
})();

/**
 * Created by Nagarjun on 04-02-2017.
 */
(function() {
    'use strict';

    angular
        .module('app.botdetails')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/botdetails/:name',
                config: {
                    title: 'Bot Details',
                    templateUrl: 'app/botdetails/botdetails.html',
                }
            }
        ];
    }
})();
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
angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/analytics/analytics.html',
    "<div data-ng-controller=\"Analytics as vm\"> {{ vm.text }} </div>"
  );


  $templateCache.put('app/botdetails/botdetails.html',
    "<div id=\"bot-details\" data-ng-controller=\"BotDetails as vm\"> <div class=\"row\"> <div class=\"content-container\"> <div class=\"headline\"> <span>Question & Answers</span> </div> <div class=\"sub-headline\"> <span>Some Description</span> </div> <div class=\"content\"> <div class=\"thumbnail\"> <div class=\"items-container\"> <div ng-repeat=\"i in vm.botQuestions\" class=\"question-item\"> <div class=\"left-content\"> <div class=\"fa fa-question question-label\"></div> <svg class=\"sm\" viewbox=\"0 0 100 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"> <defs> <pattern id=\"img-{{i}}\" patternUnits=\"userSpaceOnUse\" width=\"100\" height=\"100\"> <image xlink:href=\"/content/images/bot-dummy.png\" x=\"-25\" width=\"150\" height=\"100\"/> </pattern> </defs> <polygon class=\"hex\" points=\"50 1 95 25 95 75 50 99 5 75 5 25\" fill=\"url(#img-{{i}})\"/> </svg> </div> <div class=\"mid-content\"> <div class=\"question\"> Chlorination is a process used for water purification. The disinfecting action of chlorine is mainly due to </div> <div class=\"answer\"> The formation of hypochlorous acid when chlorine is added to water. </div> </div> <div class=\"right-content\"> <div class=\"child-hover-btn\"> <button type=\"button\" class=\"close info\" ng-click=\"\"><i class=\"fa fa-edit\"></i> </button> </div> <div class=\"child-hover-btn\"> <button type=\"button\" class=\"close warning\" ng-click=\"\"><i class=\"fa fa-trash\"></i> </button> </div> </div> </div> </div> <div class=\"row no-border\"> <div class=\"sub-headline\"> <span>Add New Utterances</span> </div> <div class=\"col-xs-12 col-md-12 text-center default-margin\"> <button class=\"btn btn-info center-block\" href=\"/botdetail\">Add New</button> </div> </div> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('app/botlearning/botlearning.html',
    "<div data-ng-controller=\"BotLearning as vm\"> {{ vm.text }} </div>"
  );


  $templateCache.put('app/layout/content.html',
    "<!-- Main app view / Routing --> <div screen-height data-ng-view id=\"view-content\" class=\"ng-animate-disabled\"></div> <!-- Main footer --> <footer data-ng-include=\"'app/layout/footer.html'\" id=\"main-footer\"></footer> "
  );


  $templateCache.put('app/layout/footer.html',
    "<div class=\"content\"> © 2017 <strong>XPRO</strong> </div>"
  );


  $templateCache.put('app/layout/header.html',
    "<div id=\"main-header\"> <ul class=\"list-inline links-list-lg pull-left\"> <li class=\"list-inline-item\"> <div class=\"sidebar-toggle-box\" ng-click=\"vmShell.toggleSidebar()\"> <div class=\"fa fa-bars tooltips\" data-placement=\"right\" data-original-title=\"Toggle Navigation\"></div> </div> </li> <li class=\"list-inline-item\"> <a href=\"index.html\" class=\"logo\">X<span>pro</span></a> </li> </ul> <ul class=\"list-inline links-list-sm pull-right\"> <li class=\"list-inline-item sep\"></li> <li class=\"list-inline-item\" ng-click=\"vmShell.logout()\"><a href=\"/\" class=\"menu-item\"> Log Out <i class=\"fa fa-sign-out right\"></i> </a></li> </ul> </div>"
  );


  $templateCache.put('app/layout/shell.html',
    "<div data-ng-controller=\"Shell as vmShell\" id=\"shell\"> <!-- Main Header --> <header data-ng-include=\"'app/layout/header.html'\" id=\"main-header\"></header> <div id=\"main\"> <div data-ng-include=\"'app/layout/sidebar.html'\" id=\"sidebar\" ng-class=\"{mobile : vmShell.sidebarToggled}\"></div> <div data-ng-include=\"'app/layout/content.html'\" id=\"content\"></div> </div> </div>"
  );


  $templateCache.put('app/layout/sidebar.html',
    "<div class=\"content\"> <ul class=\"sidebar-menu\"> <li data-ng-class=\"{'active': vmShell.location === '/'}\"><a href=\"/\"><i data-ng-class=\"{'active': vmShell.location === '/'}\" class=\"fa fa-cubes\"></i><span class=\"title\" ng-class=\"{'mobile' : vmShell.sidebarToggled}\">My Bots</span></a> </li> <li data-ng-class=\"{'active': vmShell.location === '/botlearning'}\"><a href=\"/botlearning\"><i data-ng-class=\"{'active': vmShell.location === '/botlearning'}\" class=\"fa fa-certificate\"></i><span class=\"title\" ng-class=\"{'mobile' : vmShell.sidebarToggled}\">Bot Learning</span></a> </li> <li data-ng-class=\"{'active': vmShell.location === '/settings'}\"><a href=\"/settings\"><i data-ng-class=\"{'active': vmShell.location === '/settings'}\" class=\"fa fa-gear\"></i><span class=\"title\" ng-class=\"{'mobile' : vmShell.sidebarToggled}\">Settings</span></a> </li> <li data-ng-class=\"{'active': vmShell.location === '/analytics'}\"><a href=\"/analytics\"><i data-ng-class=\"{'active': vmShell.location === '/analytics'}\" class=\"fa fa-line-chart\"></i><span class=\"title\" ng-class=\"{'mobile' : vmShell.sidebarToggled}\">Analytics</span></a> </li> </ul> </div>"
  );


  $templateCache.put('app/modals/modals.html',
    "<div modal-view-animator current-view=\"vm.currentView\" offset=\"132\"> <!-- Modal Header --> <div data-ng-class=\"{'active': vm.currentView.header == true}\" class=\"modal-header\"> <!--<a data-ng-hide=\"vm.previousView == null\" data-ng-click=\"vm.back()\" class=\"back fade-animation ng-hide\">\r" +
    "\n" +
    "            <i class=\"fa fa-chevron-left\"></i>\r" +
    "\n" +
    "        </a>--> <button ng-click=\"vm.cancel()\" type=\"button\" class=\"close\" aria-label=\"Close\"> <span aria-hidden=\"true\"><i class=\"fa fa-close\"></i></span> </button> <div data-ng-if=\"vm.currentView.header == true\"> <h4 animate-on-change value=\"vm.currentView.title\" class=\"modal-title\">{{::vm.currentView.title}}</h4> </div> </div> <!-- Modal body --> <div class=\"modal-body adjustable\"> <div class=\"modal-body-content\"> <!-- data-ng-class=\"{'active': view.id == vm.currentView.id, 'previous': view.id == vm.previousView.id}\"  --> <!-- Modal view --> <perfect-scrollbar suppress-scroll-x=\"true\" data-ng-repeat=\"view in vm.layoutData.views track by $index\" ng-show=\"view.id == vm.currentView.id\" id=\"{{view.id}}\" class=\"view\"> <!-- Included template --> <div data-ng-include=\"view.template\" id=\"{{view.name}}\" class=\"template-content\"></div> </perfect-scrollbar> </div> </div> <!-- Modal Footer --> <div data-ng-class=\"{'active': vm.currentView.footer == true}\" class=\"modal-footer\"> <div data-ng-if=\"vm.currentView.footer == true\"> <button ng-click=\"vm.cancel()\" type=\"button\" class=\"btn btn-default\">Cancel</button> <button ng-click=\"vm.accept()\" type=\"button\" class=\"btn btn-primary\">{{vm.layoutData.acceptButton}}</button> </div> </div> </div> "
  );


  $templateCache.put('app/modals/templates/createbot.html',
    "<div id=\"create-bot\"> <form class=\"form-horizontal\"> <fieldset> <!-- Text input--> <div class=\"form-group\"> <label class=\"col-md-4 control-label\" for=\"name\">Name</label> <div class=\"col-md-12\"> <input id=\"name\" name=\"name\" type=\"text\" placeholder=\"Name\" class=\"form-control input-md\" required=\"\"> </div> </div> <!-- Text input--> <div class=\"form-group\"> <label class=\"col-md-4 control-label\" for=\"shortDesc\">Short Description</label> <div class=\"col-md-12\"> <input id=\"shortDesc\" name=\"shortDesc\" type=\"text\" placeholder=\"Short Description\" class=\"form-control input-md\" required=\"\"> </div> </div> <!-- Textarea --> <div class=\"form-group\"> <label class=\"col-md-4 control-label\" for=\"longDesc\">Long Description</label> <div class=\"col-md-12\"> <textarea class=\"form-control\" id=\"longDesc\" name=\"longDesc\" placeholder=\"Long Description\"></textarea> </div> </div> <!-- Select Basic --> <div class=\"form-group\"> <label class=\"col-md-4 control-label\" for=\"type\">Bot Type</label> <div class=\"col-md-12\"> <select id=\"type\" name=\"type\" class=\"form-control\"> <option value=\"1\">Type 1</option> <option value=\"2\">Type 2</option> </select> </div> </div> </fieldset> </form> </div>"
  );


  $templateCache.put('app/modals/templates/logout.html',
    "Are you sure you wish to logout?"
  );


  $templateCache.put('app/mybots/mybots.html',
    "<div data-ng-controller=\"MyBots as vm\" id=\"my-bots\"> <div ng-repeat=\"i in vm.myBots\" class=\"item bot-item col-xs-12 col-lg-2 col-sm-4\"> <div class=\"thumbnail\"> <div class=\"top\"> <div class=\"caption\"> <h4 class=\"group inner list-group-item-heading\"> Bot Name</h4> </div> </div> <div class=\"row\"> <div class=\"middle float\"> <div class=\"center-block svg-holder\"> <svg viewbox=\"0 0 100 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" ng-click=\"vmShell.changePath('/botdetails/' + i)\"> <defs> <pattern id=\"img-{{i}}\" patternUnits=\"userSpaceOnUse\" width=\"100\" height=\"100\"> <image xlink:href=\"/content/images/bot-dummy.png\" x=\"-25\" width=\"150\" height=\"100\"/> </pattern> </defs> <polygon class=\"hex\" points=\"50 1 95 25 95 75 50 99 5 75 5 25\" fill=\"url(#img-{{i}})\"/> </svg> </div> </div> </div> <div class=\"bottom\"> <div class=\"caption\"> <p class=\"group inner list-group-item-text\"> Short Description</p> <!--<div class=\"row\">\r" +
    "\n" +
    "                        <div class=\"col-xs-12 col-md-12 text-center\">\r" +
    "\n" +
    "                            <button class=\"btn btn-info center-block\" href=\"/botdetail\">Details</button>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>--> </div> </div> </div> </div> <div class=\"item bot-item col-xs-12 col-lg-3 col-sm-4\"> <div class=\"thumbnail\"> <div class=\"top\"> <div class=\"caption\"> <h4 class=\"group inner list-group-item-heading\"> Create New Bot</h4> </div> </div> <div class=\"row\"> <div class=\"middle float\"> <div class=\"center-block svg-holder\"> <svg viewbox=\"0 0 100 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" ng-click=\"vm.createBot()\"> <defs> <pattern id=\"add-img\" patternUnits=\"userSpaceOnUse\" width=\"100\" height=\"100\"> <image xlink:href=\"/content/images/plus.png\" x=\"-25\" width=\"150\" height=\"100\"/> </pattern> </defs> <polygon class=\"hex\" points=\"50 1 95 25 95 75 50 99 5 75 5 25\" fill=\"url(#add-img)\"/> </svg> </div> </div> </div> <div class=\"bottom\"> <div class=\"caption\"> <p class=\"group inner list-group-item-text\"> Description</p> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('app/settings/settings.html',
    "<div data-ng-controller=\"Settings as vm\"> {{ vm.text }} </div>"
  );

}]);
