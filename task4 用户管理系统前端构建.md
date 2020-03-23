# task4 用户管理系统前端构建

## 项目依赖

- Vue-cli3
- Vuex
- Vue Router
- Element UI
- Axios

## 项目功能

1. 用户注册

   用户分管理员类型与普通类型，仅支持普通类型用户的注册，管理员用户在创建数据库时初始化进去。

2. 用户登录

   支持管理员及普通用户的登录，通过类型切换，登录后显示个人信息及功能菜单。

3. 用户修改个人信息

   暂时仅支持密码修改。

4. 管理员查看用户列表

   列表显示用户基本信息，列表模块支持逻辑删除用户的功能。（后面考虑分页展示与批量删除功能）

5. 管理员添加用户

   要求用户名不能重复。

6. 退出登录

   清除登录的 Session ，跳转到登录页。

## 项目结构

```
.
|-- babel.config.js
|-- package.json
|-- public
|   `-- index.html
`-- src
    |-- App.vue
    |-- assets 
    |   `-- logo.png        // 系统logo图片
    |-- components  // 所有非 `<router-view />` 中显示的页面的 Vue 组件
    |   |-- Login1.vue      // 账号密码登录表单组件
    |   |-- Login2.vue      // 手机号验证码登录表单组件
    |   |-- MainMenu.vue    // 登录后系统页面的侧边导航栏组件 
    |   |-- PageHeader.vue  // 登录后系统页面的头部导航组件
    |   `-- Register1.vue   // 注册表单组件
    |-- main.js     // Vue-cli 生成的项目基本文件
    |-- router
    |   `-- index.js   // Vue-cli 生成，路由
    |-- store   // Vuex相关
    |   `-- index.js
    |-- request // 处理 ajax 请求
    |   |-- api.js  // 统一管理所有的接口
    |   `-- http.js // axios封装，请求拦截、响应拦截、错误统一处理
    |-- validate.js // 表单输入数据正则验证
    `-- views  // `<router-view /> 下内容显示组件`
        |-- HellOPage.vue    // 欢迎页
        |-- Home.vue         // 登录后系统layout
        |-- Logger.vue       // 登录、注册layout
        |-- MyInfo.vue       // 用户个人信息组件
        `-- UserList.vue     // 用户列表组件

```

