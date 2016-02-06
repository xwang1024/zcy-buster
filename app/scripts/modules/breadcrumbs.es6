define(function(require, exports, module) {
  /** *
    * 面包屑
    * @author xwang1024@126.com
    */

  class Breadcrumbs {
    constructor() {
      /* 类代理 */
      let vm = this;

      $(window).hashchange( () => {
        vm.init();
      });
      vm.init();
    }

    init() {
        let currentPath = window.location.hash.replace(/.*\#.*\!\//, "");
        let pathSplited = currentPath.split('/');
        let breadcrumbsInfo = [];
        let dataRoot = Route.data;
        for(let i = 0; i < pathSplited.length; i++) {
          let p = pathSplited[i];
          dataRoot = dataRoot[p];
          if(typeof dataRoot !== 'undefined') {
            breadcrumbsInfo.push({
              name: dataRoot._name,
              valid: dataRoot._valid
            });
          } else {
            break;
          }
        }

        let htmlElements = [];

        for(let i = 0; i < breadcrumbsInfo.length; i++) {
          if(breadcrumbsInfo[i].valid && i < breadcrumbsInfo.length-1) {
            breadcrumbsInfo[i].href = '#!/' + pathSplited.slice(0,i+1).join('/');
            htmlElements.push(`<a href="`+breadcrumbsInfo[i].href+`">`+breadcrumbsInfo[i].name+`</a>`);
          } else {
            htmlElements.push(`<span>`+breadcrumbsInfo[i].name+`</span>`);
          }
        }


        let html = htmlElements.join(`<span class="divider">/</span>`);
        $('.breadcrumbs').html(html);

    }
  }

module.exports = Breadcrumbs;
});
