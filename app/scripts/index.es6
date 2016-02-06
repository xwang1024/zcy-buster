define(function(require) {
  if (!window['console']){
		window.console = {
      log: function() {}
    }
	}
  require('modules/route');
  Route.init();
  var Sidebar = require('modules/sidebar');
  var sidebar = new Sidebar();
});
