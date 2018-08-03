<style lang="less" src="./view.less"></style>
<template src="./view.html"></template>

<script>
import Model from './view.model';
// import Utils from '@/common/app.utils';
import top from '@/components/top/view.vue';
// import Moment from 'moment';

export default {
	name: 'home',
	data () {
		return {
			id: '',
			article: {}
		};
	},
	methods: {
		init () {
			this.id = this.$route.params.id;
			this.getArticle();
		},
		// 获取文章
		async getArticle () {
			let data = await Model.getArticle({ _id: this.id });
			if (data) {
				this.article = data;
			}
		}
	},
	created () {
		this.init();
	},
	components: {
		'cTop': top
	}
};
</script>
