---
date: 2019-11-29
tag: 
  - nginx
  - 代理
  - 正向代理
  - 反向代理
author: 锦东
location: 广州 
---

# nginx

## install on RHEL/CentOS

Install the prerequisites:

```
    sudo yum install yum-utils
```

To set up the yum repository, create the file named /etc/yum.repos.d/nginx.repo with the following contents:

```
    [nginx-stable]
    name=nginx stable repo
    baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
    gpgcheck=1
    enabled=1
    gpgkey=https://nginx.org/keys/nginx_signing.key
    module_hotfixes=true

    [nginx-mainline]
    name=nginx mainline repo
    baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
    gpgcheck=1
    enabled=0
    gpgkey=https://nginx.org/keys/nginx_signing.key
    module_hotfixes=true
```

By default, the repository for stable nginx packages is used. If you would like to use mainline nginx packages, run the following command:

```
    sudo yum-config-manager --enable nginx-mainline
```

To install nginx, run the following command:

```
    sudo yum install nginx
```

When prompted to accept the GPG key, verify that the fingerprint matches 573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62, and if so, accept it.


## remove nginx

```
    yum remove nginx
```


## 配置文件

- main：用于进行nginx全局信息的配置
- events：用于nginx工作模式的配置
- http：用于进行http协议信息的一些配置
- server：用于进行服务器访问信息的配置
- location：用于进行访问路由的配置
- upstream：用于进行负载均衡的配置

## main模块

观察下面的配置代码

```
    # user nobody nobody;
    worker_processes 2;
    # error_log logs/error.log
    # error_log logs/error.log notice
    # error_log logs/error.log info
    # pid logs/nginx.pid
    worker_rlimit_nofile 1024;
```

上述配置都是存放在 main 全局配置模块中的配置项

- user用来指定nginx worker进程运行用户以及用户组，默认nobody账号运行
- worker_processes指定nginx要开启的子进程数量，运行过程中监控每个进程消耗内存(一般几M~几十M不等)根据实际情况进行调整，通常数量是CPU内核数量的整数倍
- error_log定义错误日志文件的位置及输出级别【debug / info / notice / warn / error / crit】
- pid用来指定进程id的存储文件的位置
- worker_rlimit_nofile用于指定一个进程可以打开最多文件数量的描述

## event 模块

```
    event {
        worker_connections 1024;
        multi_accept on;
        use epoll;
    }
```

上述配置是针对nginx服务器的工作模式的一些操作配置

- worker_connections 指定最大可以同时接收的连接数量，这里一定要注意，最大连接数量是和worker processes共同决定的。
- multi_accept 配置指定nginx在收到一个新连接通知后尽可能多的接受更多的连接
- use epoll 配置指定了线程轮询的方法，如果是linux2.6+，使用epoll，如果是BSD如Mac请使用Kqueue

## http模块

作为web服务器，http模块是nginx最核心的一个模块，配置项也是比较多的，项目中会设置到很多的实际业务场景，需要根据硬件信息进行适当的配置，常规情况下，使用默认配置即可。

## server模块

srever模块配置是http模块中的一个子模块，用来定义一个虚拟访问主机，也就是一个虚拟服务器的配置信息

核心配置信息如下：

- server：一个虚拟主机的配置，一个http中可以配置多个server
- server_name：用力啊指定ip地址或者域名，多个配置之间用空格分隔
- root：表示整个server虚拟主机内的根目录，所有当前主机中web项目的根目录
- index：用户访问web网站时的全局首页
- charset：用于设置www/路径中配置的网页的默认编码格式
- access_log：用于指定该虚拟主机服务器中的访问记录日志存放路径
- error_log：用于指定该虚拟主机服务器中访问错误日志的存放路径

## location模块

location模块是nginx配置中出现最多的一个配置，主要用于配置路由访问信息

在路由访问信息配置中关联到反向代理、负载均衡等等各项功能，所以location模块也是一个非常重要的配置模块

基本配置

```
    location / {
        root    /nginx/www;
        index    index.php index.html index.htm;
    }
```

- location /：表示匹配访问根目录
- root：用于指定访问根目录时，访问虚拟主机的web目录
- index：在不指定访问具体资源时，默认展示的资源文件列表

## 使用

First enable nginx service by running systemctl command so that it start at server boot time:

```
    $ sudo systemctl enable nginx
```

- Start Nginx command

```
$ sudo systemctl start nginx
```

- Stop Nginx command

```
$ sudo systemctl stop nginx
```

- Restart Nginx command

```
    $ sudo systemctl restart nginx
```

Find status of Nginx server command

```
    $ systemctl status nginx
```

[How to install and use Nginx on CentOS 7 / RHEL 7](https://www.cyberciti.biz/faq/how-to-install-and-use-nginx-on-centos-7-rhel-7/)
