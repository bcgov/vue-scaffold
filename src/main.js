import axios from 'axios';
import NProgress from 'nprogress';
import Vue from 'vue';
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';

import App from '@/App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

/**
 * @function initializeApp
 * Initializes and mounts the vue instance
 */
function initializeApp() {
  new Vue({
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
}

// Globally register all components with base in the name
const requireComponent = require.context('@/components', true, /Base[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');
  Vue.component(componentName, componentConfig.default || componentConfig);
});

// Initialize Keycloak and Vue
Vue.use(VueKeycloakJs, {
  init: {
    onLoad: 'check-sso'
  },
  config: {
    clientId: '',
    realm: '',
    url: ''
  },
  onReady: kc => {
    const timeout = 10000;
    // Generic Axios instance with timeout
    const instance = axios.create({ timeout: timeout });
    // API focused Axios instance with timeout and authorization header insertion
    const instanceApi = axios.create({
      baseURL: '/app/api/v1',
      timeout: timeout
    });

    instanceApi.interceptors.request.use(cfg => {
      NProgress.start();
      if (kc.authenticated) {
        cfg.headers.Authorization = `Bearer ${kc.token}`;
      }
      return Promise.resolve(cfg);
    }, error => {
      return Promise.reject(error);
    });

    instanceApi.interceptors.response.use(response => {
      NProgress.stop();
      return Promise.resolve(response);
    }, error => {
      return Promise.reject(error);
    });

    // Make available to components
    Vue.prototype.$http = instance;
    Vue.prototype.$httpApi = instanceApi;

    initializeApp();
  },
  onInitError: error => {
    console.error('Keycloak failed to initialize'); // eslint-disable-line no-console
    console.error(error); // eslint-disable-line no-console
    initializeApp();
  }
});


