$(document).ready(function() {
  $('.nav-title').bind('click', function() {
    $(this).siblings('.nav-toggle-menu').slideToggle(200).toggleClass('active');
  });
});
