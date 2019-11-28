---
date: 2019-11-28
tag: 
  - flask
  - postgreSQL
author: 锦东
location: 广州 
---

# 数据库集成：使用 SQLAlchemy

Flask 本身不限定数据库的选择，你可以选择 SQL 或 NOSQL 的任何一种。也可以选择更方便的 SQLALchemy，类似于 Django 的 ORM。SQLALchemy 实际上是对数据库的抽象，让开发者不用直接和数据库打交道，而是通过 Python 对象来操作数据库，在舍弃一些性能开销的同时，换来的是开发效率的较大提升。

SQLALchemy 是一个关系型数据库框架，它提供了高层的 ORM 和底层的原生数据库的操作。flask-sqlalchemy 是一个简化了SQLALchemy 操作的 flask 扩展。

## 安装

1. 首先安装 flask-sqlalchemy

```
    pip install flask-sqlalchemy
```

2. 安装 PostgreSQL
    (下载地址)[https://www.enterprisedb.com/downloads/postgres-postgresql-downloads]
    (安装教程)[https://www.runoob.com/postgresql/windows-install-postgresql.html]

## 代码

新建 app.py 文件，在这个文件去定义和运行整个应用。这是应用的入口，引入 Flask，初始化一个 app 实例。给 app 进行一些配置，包括开启调试模式，配置数据库信息等。

```py
    #coding=utf-8
    from flask import Flask

    app = Flask(__name__)
    '''
        Set the application in debug mode
        so that the server is reloaded on any code change
        and provides detailed error messages
    '''
    app.config['DEBUG'] = True

    POSTGRES = {
        'user': 'postgres',
        'pw': '123456',
        'db': 'appdb',
        'host': 'localhost',
        'port': '5433',
    }
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
    %(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
```

新建 models.py，用 SQLAlchemy 初始化一个数据库对象，输入以下代码。

```py
    #coding=utf-8
    from flask_sqlalchemy import SQLAlchemy

    db = SQLAlchemy()
```

在 app.py 中引入 db，将 SQLAlchemy 对象和你的应用连接起来。加入以下代码：

```py
    from models import db

    # 放在 app config 之后
    db.init_app(app)
```

然后再 models.py 你可以放一些定义数据库表模型的类，继承于 db.Model。如下：

```py
    class BaseModel(db.Model):
        # Base data model for all objects
        __abstract__ = True
        # define here __repr__ and json methods or any common method
        # that you need for all your models

    class YourModel(BaseModel):
        # model for one of your table
        __tablename__ = 'my_table'
        #define your model
```

然后，在创建一个 manage.py 文件，用来做一些数据库操作，借助 flask_script 和 flask_migrate
安装以下文件：

```
    pip install Flask-Migrate
    pip install Flask-Script
```

在 manage.py 中输入以下代码：

```py
    from flask_script import Manager
    from flask_migrate import Migrate, MigrateCommand
    from app import app, db


    manager = Manager(app)
    migrate = Migrate(app, db)

    manager.add_command('db', MigrateCommand)
```

如果你想在 manger 运行 migrate 命令，还需要在文件末尾加入：

```py
    if __name__ == '__main__':
        manager.run()
```

创建数据库

在 postgres 自带的 SQL Shell 控制台，输入 `CREATE DATABASE my_database;` 创建数据库 my_database 。

至此，这个应用的目录结构应该是这样的：

```
    application_folder
    ├─ app.py
    ├─ manage.py
    └─ models.py
```

app.py

```py
    #coding=utf-8
    from flask import Flask
    from models import db

    app = Flask(__name__)
    '''
        Set the application in debug mode
        so that the server is reloaded on any code change
        and provides detailed error messages
    '''
    app.config['DEBUG'] = True

    POSTGRES = {
        'user': 'postgres',
        'pw': '123456',
        'db': 'appdb',
        'host': 'localhost',
        'port': '5433',
    }
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
    %(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES

    db.init_app(app)

    @app.route('/')
    def main():
        return 'Hello World!'

    if __name__ == '__main__':
        app.run()
```

models.py

```py
    #coding=utf-8
    from flask_sqlalchemy import SQLAlchemy
    import datetime

    db = SQLAlchemy()

    class BaseModel(db.Model):
        # Base data model for all objects
        __abstract__ = True

        def __init__(self, *args):
            super().__init__(*args)
        
        def __repr__(self):
            # Define a base way to print models
            return '%s(%s)' % (self.__class__.__name__, {
                column: value
                for column, value in self._to_dict().items()
            })

        def json(self):
            '''
                Define a base way to jsonify models, dealing with datetime objects
            '''
            return {
                column: value if not isinstance(value, datetime.date) else value.strftime('%Y-%m-%d')
                for column, value in self._to_dict().items()
            }


    class Station(BaseModel, db.Model):
        # Model for the stations table
        __tablename__ = 'stations'

        id = db.Column(db.Integer, primary_key = True)
        lat = db.Column(db.Float)
        lng = db.Column(db.Float)
```

manager.py

```py
    from flask_script import Manager
    from flask_migrate import Migrate, MigrateCommand
    from app import app, db

    manager = Manager(app)
    migrate = Migrate(app, db)

    manager.add_command('db', MigrateCommand)

    if __name__ == '__main__':
        manager.run()
```

好了，运行数据库迁移和更新：

```
    python manage.py db init
```

上面这行命令，在根目录创建了一个 migrations 文件夹，文件夹里有 alembic.ini 和 env.py，只能运行一次。

```
    python manage.py db migrate
```

上面这行命令，

```
    python manage.py db upgrade
```
