<style lang="less" src="./view.less"></style>
<template src="./view.html"></template>

<script>
import Model from './view.model';

export default {
	name: 'home',
	data () {
		return {
			user: {}
		};
	},
	methods: {
		init () {
			window.$user._id && this.login();
		},
		async login () {
			let data = await Model.login({_id: window.$user._id});
			if (data) {
				this.user = data;
			}
		},
		goEdit () {
			this.$router.push(`/edit`);
		},
		goLogin () {
			this.$router.push(`/login`);
		},
		delHtmlTag (str) {
			if (typeof str !== 'string') str = '';
			return str.replace(/<[^>]+>/g, '');
		},
		// 返回首页
		goHome () {
			this.$router.push(`/user/${window.$user.userName}`);
			location.reload();
		},
		logout () {
			window.localStorage.user = '';
			this.user = {};
		}
	},
	created () {
		this.init();
	}
};
</script>
