import axios from 'axios';
import Config from './app.config.js';

class Http {
	constructor (params) {
		this.params = params;
		this.init();
	}

	init () {
		this.instance = axios.create({
			baseURL: Config.host,
			timeout: 30000
		/* headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
		} */
		});

		// 添加请求拦截器
		this.instance.interceptors.request.use(function (config) {
			// 在发送请求之前做些什么
			// console.log('开始请求');
			window.$ui.LoadingBar.start();
			return config;
		}, function (error) {
			// console.log('结束请求');
			// 对请求错误做些什么
			return Promise.reject(error);
		});

		// 添加响应拦截器
		this.instance.interceptors.response.use(function (response) {
			// 对响应数据做点什么
			// console.log('结束请求');
			let code = response.data.code;
			if (code === 0) {
				window.$ui.LoadingBar.finish();
			} else {
				window.$ui.LoadingBar.error();
				// console.log(response.msg);
				if (code === 10010) window.$root.$router.push('/login');
				window.$ui.Message.error(response.data.msg);
			}
			return response.data;
		}, function (error) {
			window.$ui.LoadingBar.error();
			console.log('网络错误');
			// 对响应错误做点什么
			return Promise.reject(error);
		});
	}

	errIntercept () {

	}

	connect (options) {
		options = options || {};
		let userStr = window.localStorage.user;
		let user = window.$user = userStr ? JSON.parse(userStr) : {};
		options.headers = {
			'sign': user._id
		};
		return this.instance(Object.assign(this.params, options));
	}
}

export default Http;
