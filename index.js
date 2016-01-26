$(document).ready(function() {
  $('.nav-title').bind('click', function() {
    $(this).siblings('.nav-toggle-menu').slideToggle(200).toggleClass('active');
  });
  $('.layout-transform-btn').bind('click', function() {
    $('body').toggleClass('transform');
  });
});
