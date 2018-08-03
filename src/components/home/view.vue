<style lang="less" src="./view.less"></style>
<template src="./view.html"></template>

<script>
import Model from './view.model';
import Utils from '@/common/app.utils';
import top from '@/components/top/view.vue';
// import Moment from 'moment';

export default {
	name: 'home',
	data () {
		return {
			directory: [],
			articles: [],
			activeName: '-1',
			isLogin: '',
			userName: ''
		};
	},
	methods: {
		init () {
			this.isLogin = window.$user._id;
			this.getDirectory();
		},
		// 获取目录
		async getDirectory () {
			this.userName = this.$route.params.user;
			let params = {
				userName: this.userName
			};
			let data = await Model.getDirectory(params);
			if (data) {
				this.directory = data;
				let dirs = this.directory[0];
				if (dirs && dirs._id) {
					let id = dirs._id;
					this.$nextTick(() => this.activeName = id);
					this.selectDirectory(id);
				}
			}
		},
		async selectDirectory (id) {
			let params = {
				directoryId: id,
				userName: this.userName
			};
			let data = await Model.getContent(params);
			if (data) {
				this.articles = data;
			}
		},
		delHtmlTag (str) {
			if (typeof str !== 'string') str = '';
			return str.replace(/<[^>]+>/g, '');
		},
		formatDate (date) {
			date = +new Date(date);
			return Utils.getDateDiff(date);
		},
		goRead (item) {
			this.$router.push(`/read/${item.id}`);
		}
	},
	components: {
		'cTop': top
	},
	created () {
		this.init();
	}
};
</script>
