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
