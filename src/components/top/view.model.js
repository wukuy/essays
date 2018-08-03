import Http from '@/common/app.http.js';

export default {
	// 登录
	login: async function (params) {
		let result = await new Http({
			url: '/admin/login',
			method: 'post'
		}).connect({
			data: params
		});
		if (result && result.code === 0) {
			return result.data;
		}
	}
};
