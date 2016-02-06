define(function(require) {
  if (!window['console']){
		window.console = {
      log: function() {}
    }
	}
  require('modules/route');
  Route.init();
  var Sidebar = require('modules/sidebar');
  var Breadcrumbs = require('modules/breadcrumbs');

  var sidebar = new Sidebar();
  var breadcrumbs = new Breadcrumbs();
});
