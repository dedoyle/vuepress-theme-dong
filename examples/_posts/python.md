---
date: 2019-12-02
tag: 
  - python
  - pip
author: 锦东
location: 广州 
---

# pipenv 创建虚拟环境

虚拟环境是独立于 Python 全局环境的 Python 解释器环境，使用它的好处如下：

- 保持全局环境的干净
- 指定不同的依赖版本
- 方便记录和管理依赖

我们将使用 Pipenv 来创建和管理虚拟环境、以及在虚拟环境中安装和卸载依赖包。使用 Pipfile 文件记录项目依赖，使用 Pipfile.lock 文件记录固定版本的依赖列表。

首先使用 pip 安装 Pipenv

```
    pip install pipenv
```

使用 Pipenv 创建虚拟环境非常简单，使用 pipenv install 命令即可为当前项目创建一个虚拟环境：

```
    pipenv install
```

这个命令执行的过程包含下面的行为：

- 为当前目录创建一个 Python 解释器环境，按照 pip、setuptool、virtualenv 等工具库。
- 如果当前目录有 Pipfile 文件或 requirements.txt 文件，那么从中读取依赖列表并安装。
- 如果没有发现 Pipfile 文件，就自动创建。

创建虚拟环境后，我们可以使用 pipenv shell 命令来激活虚拟环境，如下所示：

```
    pipenv shell
```

## 安装 Flask

无论是否已经激活虚拟环境，你都可以使用下面的命令来安装 Flask：

```
    pipenv install flask
```

这会把 Flask 以及相关的一些依赖包安装到对应的虚拟环境，同时 Pipenv 会自动更新依赖文件。
