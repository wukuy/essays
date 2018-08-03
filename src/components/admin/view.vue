<template src="./view.html"></template>
<style src="./view.less" lang="less"></style>

<script>
import Model from './view.model';

export default {
	name: 'admin',
	data () {
		return {
			toolbars: {
				bold: true, // 粗体
				italic: true, // 斜体
				header: true, // 标题
				underline: true, // 下划线
				strikethrough: true, // 中划线
				mark: true, // 标记
				superscript: true, // 上角标
				subscript: true, // 下角标
				quote: true, // 引用
				ol: true, // 有序列表
				ul: true, // 无序列表
				link: true, // 链接
				imagelink: true, // 图片链接
				code: true, // code
				table: true, // 表格
				fullscreen: true, // 全屏编辑
				readmodel: true, // 沉浸式阅读
				htmlcode: true, // 展示html源码
				help: true, // 帮助
				/* 1.3.5 */
				save: true, // 保存（触发events中的save事件）
				/* 1.4.2 */
				navigation: true, // 导航目录
				/* 2.1.8 */
				alignleft: true, // 左对齐
				aligncenter: true, // 居中
				alignright: true, // 右对齐
				/* 2.2.1 */
				subfield: true, // 单双栏模式
				preview: true // 预览
			},
			directory: [],
			article: {
				content: '',
				name: '',
				_id: ''
			},
			addDialog: false,
			timer: null,
			// 新增文集
			corpusStr: '',
			collapse: '1',
			isShowMenu: false
		};
	},
	methods: {
		// 获取目录
		async getDirectory () {
			let data = await Model.getDirectory();
			if (data) {
				data.forEach(item => (item.isShowMenu = false));
				this.directory = data;
			}
		},
		// 新建文集
		async addCorpus () {
			let data = await Model.addCorpus({ name: this.corpusStr });
			if (data) {
				this.corpusStr = '';
				this.$refs.corpusEle.focus();
				this.$Message.success('新增成功');
				this.getDirectory();
			}
		},
		// 删除文集
		async delDirectory (id) {
			let data = await Model.delDirectory({_id: id});
			if (data) {
				this.$Message.success('删除成功');
				this.getDirectory();
			}
		},
		// 新建内容(文章)
		newFile (item) {
			let value = '';
			this.$Modal.confirm({
				render: h => {
					return h('Input', {
						props: {
							value: this.value,
							autofocus: true,
							placeholder: '请输入标题'
						},
						on: {
							input: async val => {
								value = val;
							}
						}
					});
				},
				onOk: () => {
					this.addContent({
						directoryId: item._id,
						title: value,
						content: ''
					});
				}
			});
		},
		// 显示Poptip菜单
		hidePoptip (item) {
			item.poptip = false;
		},
		// 显示Poptip菜单
		showPoptip (item) {
			item.poptip = true;
		},
		// 删除文章
		delFile (item) {
			this.$Modal.confirm({
				title: '提示:',
				content: `你确定要删除《 ${item.title} 》吗?`,
				onOk: async () => {
					await this.articleDel({
						id: item._id
					});
					this.getContent(item.directoryId);
				},
				onCancel: () => { }
			});
		},
		// 获取内容
		async getContent (id, fn) {
			let params = { directoryId: id };
			let data = await Model.getContent(params);
			if (data) {
				let currentDir = this.directory.find(item => item._id === id);
				data.forEach(item => (item.isShowMenu = false));
				currentDir.child = data;
				this.$forceUpdate();
				fn && fn();
			}
		},
		// 添加文章接口
		async addContent (params) {
			let data = await Model.addContent(params);
			if (data) {
				this.$Message.success('添加成功');
				this.getContent(params.directoryId, () => {
					this.switchArticle(data._id);
				});
			}
		},
		// 删除文章接口
		async articleDel (params) {
			let data = await Model.articleDel(params);
			if (data) {
				this.$Message.success('删除成功');
			}
		},
		// 切换文章
		switchArticle (id) {
			this.getArticle(id, data => {
				this.article = data;
			});
		},
		// 获取文章内容
		async getArticle (id, func) {
			let data = await Model.getArticle({ _id: id });
			if (data) {
				func && func(data);
			}
		},
		// CTRL + s 事件回调
		save (val, render) {
			this.article.htmlContent = render;
			this.submitSave();
		},
		// 内容改变
		async updateContent (val, render) {
			if (!this.article._id) return;
			this.article.htmlContent = render;

			clearTimeout(this.timer);
			this.timer = setTimeout(() => this.submitSave(), 3000);
		},

		async submitSave () {
			let data = await Model.updateContent(this.article);
			if (data) {
				this.$Message.success('保存成功');
			}
		},

		// 返回首页
		goHome () {
			this.$router.push(`/user/${window.$user.userName}`);
		}
	},
	mounted () {
		this.getDirectory();
	}
};
</script>
