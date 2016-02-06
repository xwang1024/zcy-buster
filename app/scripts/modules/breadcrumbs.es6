define(function(require, exports, module) {
  /** *
    * 面包屑
    * @author xwang1024@126.com
    */

  class Breadcrumbs {
    constructor() {
      /* 类代理 */
      let vm = this;

      vm.init();
    }

    init() {
      try {
        let currentPath = window.location.hash.replace(/.*\#.*\!\//, "");
        let pathSplited = currentPath.split('/');
        let breadcrumbsInfo = [];
        let dataRoot = Route.data;
        for(let p of pathSplited) {
          dataRoot = dataRoot[p];
          breadcrumbsInfo.push({
            name: dataRoot._name,
            valid: dataRoot._valid
          });
        }
        let htmlElements = [];
        for(let i in breadcrumbsInfo) {
          if(breadcrumbsInfo[i].valid && i != breadcrumbsInfo.length-1) {
            breadcrumbsInfo[i].href = '#!/' + pathSplited.slice(0,i+1).join('/');
            htmlElements.push(`<a href="`+breadcrumbsInfo[i].href+`">`+breadcrumbsInfo[i].name+`</a>`);
          } else {
            htmlElements.push(`<span>`+breadcrumbsInfo[i].name+`</span>`);
          }
        }
        let html = htmlElements.join(`<span class="divider">/</span>`);
        $('.breadcrumbs').html(html);
      } catch(e) {
        console.error('跳转到404页面')
      }

    }
  }

module.exports = Breadcrumbs;
});
