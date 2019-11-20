---
date: 2019-11-20
tag: 
  - html
  - nodelist
author: 锦东
location: 广州 
---

# NodeList

NodeList 

  - 节点的集合，是由 Node.childNodes 和 document.querySelectorAll 返回的。
  - 类数组，可用 forEach 对其进行迭代，可用 Array.from() 将其转换成数组。
  - 由 Node.childNodes 返回的 NodeList 对象是实时的，节点树发生变化，已经存在的 NodeList 对象也会更新。
  - 由 document.querySelectorAll 返回的 NodeList 对象是静态集合，节点树变化不会影响这个对象。
