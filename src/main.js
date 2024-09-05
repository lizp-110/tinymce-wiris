import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import "./mock"; // 引入Mock.js配置文件

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
