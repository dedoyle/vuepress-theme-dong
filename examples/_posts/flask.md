---
date: 2019-11-28
tag: 
  - flask
author: 锦东
location: 广州 
---

# Flask 入门教程

Flask 框架是用 Python 开发的 web 开发微框架。微框架中的“微”意味着 Flask 旨在保持核心简单而易于扩展。可定制性，通过扩展增加其功能，这是 Flask 最重要的特点。Flask 的两个主要核心应用是 Werkzeug 和模板引擎 Jinja。

## 配置与惯例

Flask 繁多的配置选项在初始状况下都有一个明智的默认值，并会遵循一些惯例。 例如，按照惯例，模板和静态文件分别存储在应用 Python 源代码树下的子目录 templates 和 static 里。虽然这个配置可以修改，但你通常不必这么做，尤其是在刚开始的时候。

## 安装 flask

我选用的 python 版本是 3.7.2

```
    pip install flask
```

## hello world

新建 hello.py 文件，并依次输入以下代码。

1. 引入 flask

```py
    from flask import Flask
```

2. 创建 Flask 对象

```py
    app = Flask(__name__)
    '''开启调试模式，一则代码变动会自动刷新，二则提供详细的错误信息'''
    app.config['DEBUG'] = True
```

我们将使用该对象进行应用的配置和运行，name 是 Python 中的特殊变量，如果文件作为主程序执行，那么 `__name__` 变量的值就是 `__main__` ，如果是被其他模块引入，那么 `__name__` 的值就是模块名称。

3. 路由

```py
    @app.route('/')
    def hello():
        return 'hello world'
```

路由使用 app 变量的 route() 装饰器来告诉 Flask 框架 URL 如何触发我们的视图函数。对路径 '/' 的请求转为对 hello 函数的调用

4. 运行

在主程序中执行 run() 来启动应用

```py
    if __name__ == '__main__':
        # 默认情况下是 5000 端口，这里改为 8080
        app.run(port=8080)
```

5. 运行整个文件

```
    python app.py
```

这时你应该能看到

```
    * Serving Flask app "app" (lazy loading)
    * Environment: production
    WARNING: This is a development server. Do not use it in a production deployment.
    Use a production WSGI server instead.
    * Debug mode: on
    * Restarting with stat
    * Debugger is active!
    * Debugger PIN: 231-041-218
    * Running on http://127.0.0.1:8080/ (Press CTRL+C to quit)
```

浏览器打开 http://127.0.0.1:8080/ 即可看到 hello world

## 使用 HTML 模板

目录结构

```
    根目录
    /app.py
    templates
        |-/index.html
        |-/hello.html
        |-/my_form.html
        |-/friend_info.html
```

app.py 文件

python 中可以用 ``` 将 html 代码 包裹起来插入代码中，但是这样做较为繁琐，因为要手动进行转义来保证代码安全。还好，Flask 配备了 Jinja2 模板引擎。使用 render_template() 来渲染模板，传入模板名和模板变量的参数即可。

```py
    from flask import Flask, render_template
```

路由改为：

```py
    @app.route('/')
    def home():
        return render_template('index.html')
```

index.html 文件

```html
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>首页</title>
    </head>
    <body>
        <h1>首页</h1>
        <a href="/hello">hello</a>
        <a href="/hello/Jack">hello Jack</a>
        <a href="/my-form">my form</a>
    </body>
```

运行代码
打开 `http://127.0.0.1:8080/`，可以看到首页，说明成功加载 index.html。

增加路由：

```py
    @app.route('/hello')
    @app.route('/hello/<username>')
    def hello(username=None):
        return render_template('hello.html', name=username)
```

```html
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Hello</title>
    </head>
    <body>
        <div style="margin-bottom: 20px;">
            <a href="/"> Back to home</a>
        </div>

        {% if name %}
            <h2>Hello {{ name }}.</h2>
        {% else %}
            <h2>Hello.</h2>
        {% endif %}
    </body>
    </html>
```

运行代码
在首页点击 hello 和 hello Jack，观察页面显示。

## 表单

增加路由 form

```py
    @app.route('/my_form', methods=['POST', 'GET'])
    def my_form():
        if request.method == 'POST':
            username = request.form['username']
            email = request.form['email']
            hobbies = request.form['hobbies']
            return redirect(url_for('friend_info',
                                    username=username,
                                    email=email,
                                    hobbies=hobbies))
        return render_template('my_form.html')


    @app.route('/friend_info', methods=['GET'])
    def friend_info():
        username = request.args.get('username')
        email = request.args.get('email')
        hobbies = request.args.get('hobbies')
        return render_template('friend_info.html',
                            username=username,
                            email=email,
                            hobbies=hobbies)
```

my_form.html

```html
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Python form</title>
    </head>
    <body>
        <div style="margin-bottom: 20px;">
            <a href="/"> Back to home</a>
        </div>

        <h1>Data Form</h1>
        <form action="my_form" method="POST">
            <label>Username</label>
            <input type="name" name="username"><br>
            <label>Email</label>
            <input type="email" name="email"><br>
            <label>Hobbies</label>
            <input type="name" name="hobbies"><br>
            <input type="submit">
        </form>
    </body>
    </html>
```

friend_info.html

```html
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Friend Info</title>
    </head>
    <body>
        <div style="margin-bottom: 20px;">
            <a href="/"> Back to home</a>
        </div>

        <h1>Friend Info</h1>
        <hr>
        <h1>Username: {{ username }}</h1>
        <h1>Email: {{ email }}</h1>
        <h1>Hobbies: {{ hobbies }}</h1>
    </body>
    </html>
```

运行代码，点击 my_form，输入信息后按下提交按钮。会发送 post 请求到 `/my_form`，并自动跳转至 `/friend_info`。
