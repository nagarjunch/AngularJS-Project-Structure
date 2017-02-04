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
