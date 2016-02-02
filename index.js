$(document).ready(function() {
  // 当前是否处于收起状态
  var isCollapsed = $('body').hasClass('collapsed');
  var initSidebar = function() {
    // 针对不同的情况初始化不同的事件
    if(isCollapsed) {
      $('.nav-title').unbind().bind('mouseover click', function(event) {
        event.stopPropagation();
        $('.nav-toggle-menu.nav-menu-float').trigger('mouseleave');
        $(this).siblings('.nav-toggle-menu').clone()
          .appendTo($(this).parents('.sidebar'))
          .addClass('nav-menu-float')
          .css({"top": parseInt($(this).offset().top), "display": "block"})
          .bind('mouseleave', function(event) {
            $('.nav-toggle-menu.nav-menu-float').remove();
          })
          .bind('mouseover', function(event) {
            event.stopPropagation();
          });


      });
      $('body').unbind().bind('mouseover click', function(event) {
        $('.nav-toggle-menu.nav-menu-float').trigger('mouseleave');
      })
    } else {
      // 绑定父级菜单的点击事件
      $('.nav-title').unbind().bind('click', function() {
        $(this).siblings('.nav-toggle-menu').slideToggle(200).toggleClass('active');
      });
    }
  }

  // 绑定底部变形按钮
  $('.layout-collapse-btn').bind('click', function() {
    $('body').toggleClass('collapsed');
    isCollapsed = !isCollapsed;
    initSidebar();
  });

  initSidebar();
  
});
