import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home/view.vue';
import read from '@/components/read/view.vue';
import login from '@/components/login/view.vue';
import admin from '@/components/admin/view.vue';

Vue.use(Router);

let router = new Router({
	routes: [{
		path: '/user/:user',
		name: 'home',
		component: home
	}, {
		path: '/login',
		name: 'login',
		component: login
	}, {
		path: '/edit/',
		name: 'edit',
		component: admin
	}, {
		path: '/read/:id',
		name: 'read',
		component: read
	}]
});

router.beforeEach((to, from, next) => {
	switch (to.path) {
		case '/':
			next({ path: '/user/wukuy' });
			break;
		case '/edit':
			if (!window.$user) {
				window.$ui.Message.error('你还未登陆!');
				setTimeout(() => next('/login'), 1400);
			}
			break;
		default:
			next();
	}
	next();
});

export default router;
