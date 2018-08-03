<template src="./view.html"></template>
<style src="./view.less" lang="less"></style>

<script>
import Model from './view.model';
import '@/assets/js/particles.js';

export default {
	name: 'login',
	data () {
		return {
			formInline: {
				user: '',
				password: ''
			},
			ruleInline: {
				user: [
					{ required: true, message: '请输入账号', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
				]
			}
		};
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate(async (valid) => {
				if (valid) {
					let data = await Model.login({
						userName: this.formInline.user,
						password: this.formInline.password
					});
					if (data) {
						this.$Message.success('登录成功');
						window.$user = window.localStorage.user = JSON.stringify(data);
						setTimeout(() => {
							this.$router.push(`/user/${this.formInline.user}`);
						}, 1500);
					}
				}
			});
		},
		async registerSubmit () {
			let data = await Model.register({
				userName: this.formInline.user,
				password: this.formInline.password
			});
			if (data) {
				this.$Message.success('注册成功');
			}
		},
		backgroundInit () {
			particlesJS.load('particles-js', 'static/js/particles.json', function () {
				console.log('callback - particles.js config loaded');
			});
		}
	},
	mounted () {
		this.backgroundInit();
	}
};
</script>
