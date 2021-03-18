import axios from "axios";
import ServiceQueue from "./http-retry-queue.js";
import Alert from "../components/Alert.vue";
import Vue from "vue";
// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    const promise = ServiceQueue.pushRetryFn({
      reason: "failed-request",
      retryFn: () => {
        console.log("CB at interceptor", error.config);
        error.config.url = "https://httpstat.us/200";
        return axios(error.config);
      }
    });

    // instead of showing this alert, maybe trigger another
    // action like update your Vuex store, or
    // call another method to refresh a token perhaps
    if (!document.getElementById("alert")) {
      // the component below will call this function
      // to retry all in the ServiceQueue
      const retryFn = () => {
        return ServiceQueue.retryAll();
      };
      const AlertClass = Vue.extend(Alert);
      const AlertVm = new AlertClass({
        propsData: {
          retryFn,
          alerts: ServiceQueue.retryQueue
        }
      });
      AlertVm.$mount();
      document.getElementById("app").appendChild(AlertVm.$el);
    }
    return promise;
  }
);

export default axios;
