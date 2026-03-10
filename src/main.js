import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { firebaseApp } from "./firebase";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { VueFire, VueFireAuth } from "vuefire";

createApp(App)
  .use(store)
  .use(router)
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
  .mount("#app");
