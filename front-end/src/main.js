import Vue from "vue";
import ElementUI from "element-ui";
import VueClipboard from "vue-clipboard2";
import ECharts from "vue-echarts";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import locale from "../node_modules/element-ui/lib/locale/lang/en";

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(VueClipboard);
Vue.component("v-chart", ECharts);

import TIM from "tim-js-sdk";
import COS from "_cos-js-sdk-v5@1.4.6@cos-js-sdk-v5";
let options = {
  SDKAppID: 1400747994 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
};
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(options);
tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
// 注册 COS SDK 插件
tim.registerPlugin({ "cos-js-sdk": COS });
Vue.prototype.tim = tim;

Vue.directive('preventClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
