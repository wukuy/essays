# essays

>以前笔记都是用简书写的，但简书没有搜索功能，笔记写的一多，
>所以自己撸个'简书'要什么功能有什么功能。
>以上都是废话，主要还是为了学习node。

### 线上地址
http://www.wukuy.cn

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
