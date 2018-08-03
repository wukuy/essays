# my-blog

>以前笔记都是用简书写的，但简书没有搜索功能，写的文字多，经常笔记找着找着都不知道自己要找什么。
>所以自己撸个'简书'要什么功能有什么功能。
>以上都是废话，主要还是为了学习node。

### 项目结构
```

├── server		// 后台
│   ├── app.js
│   ├── db
│   ├── models
│   ├── routers
│   ├── schemas
│   └── yarn.lock
├── src			// 前端
│   ├── App.vue
│   ├── assets
│   ├── common
│   ├── components
│   ├── main.js
│   └── router
```
### 技术栈
后台: `node` +  `mogodb` + `express`
前端: `vue.js` + `less` + `iView`

### 运行后台
```bash
# 到 `server` 目录下安装 `npm` 包
cd server/ && npm i

# 确保`mongodb`已安装, 启动数据库
npm run db

# 启动node 
npm run dev
```
### 运行前端
```bash
# 项目根目录
npm i

npm run dev
```

### 项目部署
xx

### 线上地址
http://www.wukuy.cn