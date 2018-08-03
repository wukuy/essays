import Http from '@/common/app.http.js';

export default {
	// 获取文章内容
	getArticle: async function (params) {
		let result = await new Http({
			url: '/get/article',
			method: 'get'
		}).connect({ params });

		if (result && result.code === 0) {
			let data = result.data;
			return data;
		}
	}
};
