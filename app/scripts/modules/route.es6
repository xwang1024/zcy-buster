define(function(require, exports, module) {
  /** *
    * 路由模块，对页面元素进行高亮，加载相应页面到右侧
    * @author xwang1024@126.com
    */
  window.Route = {
    target: ".content-main",
    defaultPath: "dashboard",
    currentPath: "",
    viewRoot: "page",
    suffix: '.html',
    listeners: [],
    init: () => {
      // 当前hash检测
      let loadPage = function() {
        Route.currentPath = window.location.hash.replace(/.*\#.*\!/, "");
        Route._load(Route.viewRoot + Route.currentPath + Route.suffix);
      }
      loadPage();
      // 加载页面
      $(window).hashchange( () => {
        console.log('hash changed: ' + window.location.hash);
        loadPage();
      });
      console.log('init route module');
    },
    _load: (path) => {
      $.ajax({
        type: 'GET',
        url: path,
        async: true,
        complete: (xhr, text) => {},
        cache: true,
        error: (xhr, text, e) => {
          if(xhr.status === 404) {
            window.location.hash = '#!/404';
          }
          console.log(xhr, text, e);
        },
        global: true,
        headers: {},
        statusCode: {},
        success: (data, text, xhr) => {},
        dataType : "html",
        beforeSend: function() {
          if ($("#loadingbar").length === 0) {
            $("body").append("<div id='loadingbar'></div>")
            $("#loadingbar").addClass("waiting").append($("<dt/><dd/>"));
            let contentPercentage = $('.content').outerWidth()/$('body').width();
            $("#loadingbar").width((50 + Math.random() * 30) * contentPercentage + "%");
          }
        }
      }).always(function() {
        let contentPercentage = $('.content').outerWidth()/$('body').outerWidth();
        $("#loadingbar").width(100 * contentPercentage + "%").delay(200).fadeOut(400, function() {
            $(this).remove();
        });
      }).done(function(data) {
        $(Route.target).html(data);
        $(document).scrollTop(0)
      });
    }
  }

  window.Route.data = {
    "dashboard": {
      _name: "我的工作台",
      _valid: true
    },
    "specifications": {
      _name: "规范",
      "typo": {
        _name: "字体",
        _valid: true
      },
      "color": {
        _name: "颜色",
        _valid: true
      }
    },
    "components": {
      _name: "组件",
      "panel": {
        _name: "Panel",
        _valid: true
      },
    }
  }
});
