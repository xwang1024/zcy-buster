define(function(require) {
  require('modules/route');
  Route.init();
  var Sidebar = require('modules/sidebar');
  var sidebar = new Sidebar();
});
