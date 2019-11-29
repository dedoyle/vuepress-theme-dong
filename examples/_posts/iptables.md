---
date: 2019-11-29
tag: 
  - iptables
  - 防火墙
  - 安全策略
author: 锦东
location: 广州 
---

# iptables

## Disable FirewallD

stop the FirewallD service:

```
  sudo systemctl stop firewalld
```

Disable the FirewallD service to start automatically on system boot:

```
  sudo systemctl disable firewalld
```

Mask the FirewallD service to prevent it from being started by another services:

```
  sudo systemctl mask --now firewalld
```

## Install and Enable Iptables

1. Run the following command to install the iptables-service package from the CentOS repositories:

```
  sudo yum install iptables-services
```

Once the package is installed start the Iptables service:

```
  sudo systemctl start iptables
  sudo systemctl start iptables6
```

Enable the Iptables service to start automatically on system boot:

```
  sudo systemctl enable iptables
  sudo systemctl enable iptables6
```

Check the iptables service status with:

```
  sudo systemctl status iptables
  sudo systemctl status iptables6
```

To check the current iptables rules use the following commands:

```
  sudo iptables -nvL
  sudo iptables6 -nvL
```

By default only the SSH port 22 is open. The output should look something like this:

```
  Output
  Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
  pkts bytes target     prot opt in     out     source               destination         
  5400 6736K ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            state RELATED,ESTABLISHED
      0     0 ACCEPT     icmp --  *      *       0.0.0.0/0            0.0.0.0/0           
      2   148 ACCEPT     all  --  lo     *       0.0.0.0/0            0.0.0.0/0           
      3   180 ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            state NEW tcp dpt:22
      0     0 REJECT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            reject-with icmp-host-prohibited

  Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
  pkts bytes target     prot opt in     out     source               destination         
      0     0 REJECT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            reject-with icmp-host-prohibited

  Chain OUTPUT (policy ACCEPT 4298 packets, 295K bytes)
  pkts bytes target     prot opt in     out     source               destination     
```

At this point, you have successfully enabled the iptables service and you can start building your firewall. The changes will persist after a reboot.

(how to install iptables on centos 7)[https://linuxize.com/post/how-to-install-iptables-on-centos-7/#prerequisites]

(man page)[https://linux.die.net/man/8/iptables]

(阿里云linux服务器上使用iptables设置安全策略的方法)[https://www.jb51.net/article/94839.htm]

(Linux服务器最最基本安全策略)[https://cloud.tencent.com/developer/article/1071312]
