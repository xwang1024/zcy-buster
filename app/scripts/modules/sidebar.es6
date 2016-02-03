define(function(require, exports, module) {
  /** *
    * 侧边栏
    * @author xwang1024@126.com
    */
  class Sidebar {
    constructor() {
      /* 类代理 */
      let vm = this;

      /* 成员变量 */
      vm.isCollapsed = $('body').hasClass('collapsed');

      // 绑定底部的toggle-collapse按钮
      $('.layout-collapse-btn').bind('click', function() {
        $('.nav-toggle-menu').removeClass('active').removeAttr('style');
        vm.toggleSidebar();
      });

      vm.initBindings();

      $(window).hashchange( () => {
        vm.highlightItem();
      });
      vm.highlightItem();
    }

    highlightItem() {
      $('.sidebar-wrapper .active[href]').removeClass('active');
      $('.sidebar-wrapper [href="'+window.location.hash+'"]').addClass('active');
    }

    initBindings() {
      let vm = this;

      if(vm.isCollapsed) {
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
        $('.nav-title').unbind().bind('click', function() {
          $(this).siblings('.nav-toggle-menu').slideToggle(200).toggleClass('active');
        });
      }
    }

    toggleSidebar() {
      let vm = this;

      $('body').toggleClass('collapsed');
      vm.isCollapsed = !vm.isCollapsed;
      vm.initBindings();
    }
  }

  module.exports = Sidebar;
});
