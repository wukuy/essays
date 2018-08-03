import Http from '@/common/app.http.js';

export default {
	// 获取目录
	getDirectory: async function () {
		let result = await new Http({
			url: '/admin/get/directory/',
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
	// 新增文集
	addCorpus: async function (params) {
		let result = await new Http({
			url: '/admin/add/directory',
			method: 'post'
		}).connect({data: params});

		if (result && result.code === 0) return true;
	},
	// 删除文集
	delDirectory: async function (params) {
		let result = await new Http({
			url: '/admin/del/directory/',
			method: 'post'
		}).connect({data: params});

		if (result && result.code === 0) return true;
	},
	// 获取文章
	getContent: async function (params) {
		let result = await new Http({
			url: '/admin/get/content',
			method: 'get'
		}).connect({params});

		if (result && result.code === 0) {
			let data = result.data;
			return data;
		}
	},
	// 删除文章
	articleDel: async function (params) {
		let result = await new Http({
			url: '/admin/del/content',
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
			url: '/admin/get/article',
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
			url: '/admin/add/content',
			method: 'post'
		}).connect({data: params});

		if (result && result.code === 0) {
			return result.data;
		}
	},
	// 修改内容
	updateContent: async function (params) {
		let result = await new Http({
			url: '/admin/update/content',
			method: 'post'
		}).connect({data: params});
		if (result && result.code === 0) return true;
	}
};
