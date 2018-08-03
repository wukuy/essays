import '@/assets/css/global.less';
let userStr = window.localStorage.user;
window.$user = userStr ? JSON.parse(userStr) : {};
