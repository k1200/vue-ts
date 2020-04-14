import Vue from "vue";
const positionErrorInput = form => {
  let fields = form.fields;
  for (let field of fields) {
    if (field.validateState === "error") {
      let dom = field.$el;
      try {
        dom.scrollIntoView({
          //滚动到指定节点
          block: "center", // 值有start,center,end，nearest，当前显示在视图区域中间
          behavior: "smooth" // 值有auto、instant,smooth，缓动动画（当前是慢速的）
        });
      } catch (e) {}
      try {
        dom.querySelector("input").focus();
      } catch (e) {}
      dom = null;
      return;
    }
  }
};
Vue.directive("error-focus", {
  update: function(el, binding, vnode) {
    let [validateState, oldValidateState] = [binding.value, binding.oldValue];
    if (validateState !== oldValidateState) {
      positionErrorInput(vnode.componentInstance.$data);
    }
  }
});
