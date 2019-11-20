---
date: 2019-11-20
tag: 
  - webpack
  - react
  - javascript
author: 锦东
location: 广州 
---

# webpack4+react

## webpack 核心概念

- Entry: 一个可执行模块或库的入口文件。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件，Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk: 代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader: 模块转换器，例如把 es6 转换为 es5，scss 转换为 css。
- Plugin: 扩展插件，用于扩展 webpack 的功能，在 webpack 构建生命周期的节点上加入扩展 hook 为 webpack 加入功能。
- Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

## webpack.config.js

```
  mkdir react-webpack
  cd react-webpack
  mkdir src
  tyarn init -y

  // 安装 webpack 和相关模块
  tyarn add webpack webpack-cli webpack-dev-server -D
  touch webpack.config.js
```

webpack.config.js 添加如下代码
```js
  const path = require("path")
  module.exports = {
    entry: ['./src/index.js'], // 项目文件入口
    output: {
      // 输出目录
      path: path.resolve(__dirname, '../dist')
    },
    module: {},
    plugins: [],
    devServer: {}
  }
```

但是在实际项目开发中，开发环境和生产环境的配置会有不同，所以还需要在根目录创建 build 目录，并在该目录下创建三个文件。

```
mkdir build
cd build
touch webpack.base.config.js webpack.dev.config.js webpack.prod.config.js

tyarn add @babel/core @babel/preset-react @babel/preset-env babel-loader
tyarn add webpack-merge html-webpack-plugin mini-css-extract-plugin happypack friendly-errors-webpack-plugin clean-webpack-plugin workbox-webpack-plugin
```

## webpack.base.config.js

```js
  const path = require('path')
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const HappyPack = require('happypack')
  const os = require('os')
  const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

  module.exports = {
    // 配置入口
    entry: ['./src/index.js'],
    output: {
      // 输出目录
      path: path.resolve(__dirname, '../dist')
    },
    resolve: {
      // 配置模块如何解析
      // 在导入语句没带文件后缀时，webpack 会自动带上后缀去尝试访问文件是否存在
      extensions: ['.js', '.jsx'], // 扩展
      alias: {
        // 创建 import 或 require 的别名，来确保模块引入变得更简单
        '@': path.resolve(__dirname, 'src'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@assets': path.resolve(__dirname, 'src/assets')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'happypack/loader?id=happyBabel'
            }
          ]
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', // 编译 css
            'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
            'less-loader' // 编译 less
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)/,
          use: {
            loader: 'url-loader',
            options: {
              outputPath: 'images/', // 图片输出的路径
              limit: 10 * 1024
            }
          }
        },
        {
          test: /\.(eot|woff2?|ttf|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name]-[hash:5].min.[ext]',
                limit: 5000, // 使用 base64 进行转换， 大小限制小于 5KB， 否则使用 svg 输出
                publicPath: 'fonts/',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        // 默认在 dist 下生成 index.html，并将每次打包的 js 自动插入 html。
        // 还可以指定 html 模板来创建 index.html
        title: 'react-webpack', // 网页标题，默认值：Webpack App
        template: path.resolve(__dirname, '..', 'src/index.html') // 模板路径，默认值：空
        // minify 在 mode 为 production 时，按以下配置进行压缩，其他 mode 不压缩。
        // minify: {
        //  collapseWhitespace: true,
        //  removeComments: true,
        //  removeRedundantAttributes: true,
        //  removeScriptTypeAttributes: true,
        //  removeStyleLinkTypeAttributes: true,
        //  useShortDoctype: true
        // }
      }),
      // 默认 css 是打包进 js 里面的
      // 用这个插件可以将 css 和 js 分离开来，分别下载加快页面渲染
      new MiniCssExtractPlugin({
        filename: "[name]-[contenthash:5].css",
        chunkFilename: "[id]-[contenthash:5].css"
      }),
      // 让 webpack 同时处理多个任务
      // 将任务分解给多个子进程去并发执行，子进程处理完后再将结果发送给主进程
      new HappyPack({
        // 用 id 来标识 happypack 处理那里类文件
        id: 'happyBabel',
        // 用法和 loader 的配置一样
        loaders: [
          {
            loader: 'babel-loader?cacheDirectory=true'
          }
        ],
        // 共享进程池 threadPool: HappyThreadPool 代表共享进程池，
        // 即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
        threadPool: happyThreadPool,
        // 允许 HappyPack 输出日志
        verbose: true
      })
    ],
    performance: false // 关闭性能提示
  }
```

### webpack hash

1. webpack 中对于输出文件名可以有三种 hash 值：
  - hash: 如果都使用 hash 的话，因为这是工程级别的，即每次修改任何一个文件，所有文件名的 hash 至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效。
  - chunkhash: 根据不同的入口文件 (Entry) 进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用 chunkhash 的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响，但是同一个模块，就算将 js 和 css 分离，其哈希值也是相同的，修改一处，js 和 css 哈希值都会变，同 hash，没有做到缓存意义。
  - contenthash：表示由文件内容产生的 hash 值，内容不同产生的 contenthash 值也不一样。在项目中，通常做法是把项目中 css 都抽离出对应的 css 文件来加以引用。（只要文件内容不一样，产生的哈希值就不一样）
  所以 css 文件最好使用 contenthash

## webpack.dev.config.js

```js
  const path = require('path')
  const merge = require('webpack-merge')
  const commonConfig = require('./webpack.base.config.js')
  const webpack = require('webpack')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
  module.exports = merge(commonConfig, {
    mode: 'development', // webpack 4.0 要申明这个
    devtool: 'cheap-module-eval-soure-map',
    output: {
      // 输出目录
      path: path.resolve(__dirname, '../dist'),
      // 文件名称
      filename: 'bundle.js',
      chunkFilename: '[name].js'
    },
    plugins: [
      // 开启 HMR（热替换功能，替换更新部分，不重载页面！)
      new webpack.HotModuleReplacementPlugin(),
      // [DefinePlugin 相关文章](https://juejin.im/post/5868985461ff4b0057794959)
      new webpack.DefinePlugin({
        // 用 JSON.stringify 可以方便的将所有类型转成字符串
        ENV: JSON.stringify('development')
      }),
      // 识别某些类别的 webpack 错误
      new FriendlyErrorsPlugin({
        // 运行成功
        compilationSuccessInfo: {
          message: ['你的应用程序在这里运行 http://localhost:8001'],
          notes: ['有些附加说明要在成功编辑时显示']
        },
        // 运行错误
        onErrors: function(severity, errors) {
          //您可以收听插件转换和优先级的错误，严重性可以是'错误'或'警告'
        },
        //是否每次编译之间清除控制台，默认为 true
        clearConsole: true,
        //添加格式化程序和变换器（见下文）
        additionalFormatters: [],
        additionalTransformers: []
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname, '../dist'), // 指定访问资源目录
      historyApiFallback: true, // 该选项的作用所有的 404 都连接到 index.html
      disableHostCheck: true, // 绕过主机检查
      inline: true, // 改动后是否自动刷新
      host: 'localhost', // 访问地址
      port: 8001, // 访问端口
      overlay: true, // 出现编译器错误或警告时在浏览器中显示全屏覆盖
      stats: 'errors-only', // 显示捆绑软件中的错误
      compress: true, // 对所有服务启用 gzip 压缩
      open: true, // 自动打开浏览器
      progress: true, // 显示编译进度
      proxy: {
        // 代理到后端的服务地址
        '/api': 'http://localhost:8000'
      }
    }
  })
```

## webpack.prod.config.js

```js
  const path = require('path')
  const webpack = require('webpack')
  const merge = require('webpack-merge')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const commonConfig = require('./webpack.base.config.js')
  const PurifyCSS = require('purifycss-webpack')
  const glob = require('glob-all')
  const WorkboxPlugin = require('workbox-webpack-plugin') // 引入 PWA 插件

  module.exports = merge(commonConfig, {
    mode: 'production', // webpack 4.0 要申明这个
    output: {
      // 输出目录
      path: path.resolve(__dirname, '../dist'),
      // 文件名称
      filename: '[name].[contenthash:5].js',
      chunkFilename: '[name].[contenthash:5].js'
    },
    devtool: 'cheap-module-source-map',
    optimization: {
      usedExports: true, // js Tree Shaking 清除到代码中无用的 js 代码，只支持 import 方式引入，不支持 commonjs 的方式引入
      splitChunks: {
        chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors'
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(), // 打包时删除之前的文件
      // 清除无用 css---生产环境---csstree-shaking
      new PurifyCSS({
        paths: glob.sync([
          // 清除无用 css---生产环境-- 对于 css 的 tree shaking 使用 purifycss-webpack 配合 glob-all 来实现 。
          path.resolve(__dirname, '..', 'src/*.html'),
          path.resolve(__dirname, '..', 'src/*.js'),
          path.resolve(__dirname, '..', 'src/**/*.jsx')
        ])
      }),
      // PWA 配置，生产环境才需要，PWA 优化策略。
      // 在你第一次访问一个网站的时候，如果成功，做一个缓存。
      // 当服务器挂了之后，你依然能够访问这个网页 ，这就是 PWA。
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      })
    ]
  })
```

### source-map
  - devtool: "cheap-module-eval-source-map", // 开发环境配置
  - devtool: "cheap-module-source-map", // 线上生成配置

### css Tree Shaking

去除项目代码中用不到的 CSS 样式，仅保留被使用的样式代码
```
  tyarn add glob-all purify-css purifycss-webpack 
```

### babel

配置
  - presets：是某一类 plugin 的集合，包含了某一类插件的所有功能。
  - plugin：将某一种需要转化的代码，转为浏览器可以执行代码。

编译的执行顺序
  1. 执行 plugins 中所有的插件
  2. plugins 的插件，按照顺序依赖编译
  3. 所有 plugins 的插件执行完成，在执行 presets 预设。
  4. presets 预设，按照倒序的顺序执行。(从最后一个执行)

　　　　5、完成编译。
