---
date: 2019-11-20
tag: 
  - webpack
  - ant design
  - vue cli
author: 锦东
location: 广州 
---

# vue-cli and ant design

1. 安装 vue-cli

```
tyarn global add @vue/cli
```

我的版本是 4.1.1

2. 创建项目

```
vue create antd-demo
```

3. 进入项目

```
cd antd-demo
```

4. 安装 ant-design-vue

```
tyarn add ant-design-vue
```

5. 动态加载模块

```
tyarn add -D babel-plugin-import
```

6. 兼容 ie 9

```
tyarn add @babel/polyfill @@babel/runtime
tyarn add -D @babel/plugin-transform-runtime
```

7. 创建 .editorconfig

```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = false
```

8. package.json

我选择将配置写在 package.json，而不是拆开多个文件。这里配置一下浏览器版本和 prettier。

```
"browserslist": [
    "> 1%",
    "last 2 versions",
    "IE 9"
],
"prettier": {
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": false,
    "singleQuote": true,
    "semi": false,
    "trailingComma": "none"
}
```

9. babel.config.js

```
module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true
      }
    ],
    '@babel/plugin-transform-runtime'
  ]
}
```

10. 新建 vue.config.js

我这里加入这个配置是因为编译时发现报错，加入这个配置解决 less 的编译问题。

```
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
```

11. main.js

```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'ant-design-vue' // 动态加载 button
import 'core-js/stable'
import 'regenerator-runtime/runtime'

Vue.config.productionTip = false
Vue.component(Button.name, Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```

这里有个地方要注意，根据 babel.config.js 中 corejs 的配置，这里加入的代码不同。
@babel/preset-env 选择 corejs 3，是添加

```
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```

@babel/preset-env 选择 corejs 2，是添加

```
import '@babel/polyfill'
```

11. Home.vue

测试一下加入 button

```
<a-button type="primary">Button></a-button>
```
