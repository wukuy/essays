// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '@/common/app.init.js';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
// use
Vue.use(mavonEditor);

Vue.use(iView);
window.$ui = iView;
Vue.config.productionTip = false;

/* eslint-disable no-new */
window.$root = new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>'
});
