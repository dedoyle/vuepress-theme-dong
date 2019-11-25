# 阿里云服务器配置

## 设置管理终端密码

1. 实例有个更多的操作，展开点击密码/密钥里的重置
2. 设置好密码，展开更多，点击实例状态里的重启


## 登录管理终端

1. 打开远程连接
2. 第一次点击远程连接，会弹出远程连接密码，记住这个密码。
3. 输入远程连接密码，确定，进入管理终端。
4. 这里需要输入账号密码


## 开启 ssh

1. 修改备份文件前先备份配置文件 `cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.bak`
2. `vi /etc/ssh/sshd_config`
3. 去掉 `Port 22` 前的 `#`
4. 去掉 `PermitRootLogin yes` 前的 `#`
5. `:wp` 保存退出
6. `service sshd restart` 重启 sshd

## ssh 免密登录

1. 本地运行 `ssh-keygen -t rsa -f id_rsa_filename -C mail@mail.com`
2. 本地运行 `ssh-add ~/.ssh/id_rsa_filename` （具体可查看《管理多个 ssh key》这部分）
3. 本地运行 `ssh-copy-id -i ~/.ssh/id_rsa_filename.pub root@server_ip`
4. 本地运行 `ssh root@server_ip -p ssh_port`，即可无密码登录


## 管理多个 ssh key

1. `cd ~/.ssh`
2. `ls` 可以看到你生成了多少个 ssh key

### 设置ssh key的代理

1. 查看代理  `ssh-add -l`
  - 若提示 `Could not open a connection to your authentication agent.` 
    则代表没任何 key，运行 `exec ssh-agent bash `
  - 若已有 ssh key，可以选择是否删除，运行 `ssh-add -D`
2. 代理中添加私钥
  默认只读取 id_rsa，为了让 SSH 识别新的私钥，需将其添加到 SSH agent 中：

  ```
    ssh-add ~/.ssh/id_rsa_gitlab
    ssh-add ~/.ssh/id_rsa_github 
  ```
  
  查看添加的代理
  ```
  ssh-add -l
  ```