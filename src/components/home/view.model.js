import Http from '@/common/app.http.js';

export default {
	// 获取目录
	getDirectory: async function (params) {
		let result = await new Http({
			url: '/get/directory',
			params,
			method: 'get'
		}).connect();

		if (result && result.code === 0) {
			let data = result.data;
			data.forEach(item => {
				item.showTip = false;
				item.child = [];
			});
			return data;
		}
	},
	// 获取文章
	getContent: async function (params) {
		let result = await new Http({
			url: '/get/content',
			method: 'get'
		}).connect({params});

		if (result && result.code === 0) {
			let data = result.data;
			return data;
		}
	},
	// 获取文章内容
	getArticle: async function (params) {
		let result = await new Http({
			url: '/get/article',
			method: 'get'
		}).connect({params});

		if (result && result.code === 0) {
			let data = result.data;
			return data;
		}
	},
	// 新增文章
	addContent: async function (params) {
		let result = await new Http({
			url: '/add/content',
			method: 'post'
		}).connect({data: params});

		if (result && result.code === 0) return true;
	},
	updateContent: async function (params) {
		let result = await new Http({
			url: '/update/content',
			method: 'post'
		}).connect({data: params});

		if (result && result.code === 0) return true;
	}
};
